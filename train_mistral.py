import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
    pipeline,
    logging
)
from peft import LoraConfig, PeftModel
from trl import SFTTrainer
from datasets import Dataset
import json
import os

# Tắt logging không cần thiết
logging.set_verbosity_error()

def load_training_data():
    """Load và format dữ liệu training từ JSONL file"""
    data = []
    with open('fine_tuning_data.jsonl', 'r', encoding='utf-8') as f:
        for line in f:
            data.append(json.loads(line))
    
    # Convert to text format for training
    texts = []
    for item in data:
        messages = item['messages']
        text = ""
        for msg in messages:
            if msg['role'] == 'system':
                text += f"<|system|>\n{msg['content']}\n<|end|>\n"
            elif msg['role'] == 'user':
                text += f"<|user|>\n{msg['content']}\n<|end|>\n"
            elif msg['role'] == 'assistant':
                text += f"<|assistant|>\n{msg['content']}\n<|end|>\n"
        texts.append(text)
    
    return Dataset.from_dict({"text": texts})

def main():
    print("🚀 Bắt đầu fine-tuning Mistral 7B cho tạo câu chuyện môi trường...")
    
    # Load dataset
    print("📊 Loading dataset...")
    dataset = load_training_data()
    print(f"✅ Dataset loaded: {len(dataset)} samples")
    
    # Cấu hình quantization để tiết kiệm VRAM
    print("⚙️ Cấu hình quantization...")
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.float16,
        bnb_4bit_use_double_quant=False,
    )
    
    # Load model và tokenizer
    print("🤖 Loading Mistral 7B model...")
    model_name = "mistralai/Mistral-7B-v0.1"
    
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True,
        torch_dtype=torch.float16,
    )
    
    tokenizer = AutoTokenizer.from_pretrained(
        model_name, 
        trust_remote_code=True
    )
    tokenizer.pad_token = tokenizer.eos_token
    
    print("✅ Model loaded successfully!")
    
    # Cấu hình LoRA
    print("🔧 Cấu hình LoRA...")
    peft_config = LoraConfig(
        lora_alpha=16,
        lora_dropout=0.1,
        r=64,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=[
            "q_proj",
            "k_proj", 
            "v_proj",
            "o_proj",
            "gate_proj",
            "up_proj",
            "down_proj",
        ]
    )
    
    # Cấu hình training
    print("📈 Cấu hình training parameters...")
    training_args = TrainingArguments(
        output_dir="./mistral-environmental-stories",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        gradient_checkpointing=True,
        optim="paged_adamw_32bit",
        logging_steps=10,
        save_strategy="epoch",
        learning_rate=2e-4,
        fp16=True,
        max_grad_norm=0.3,
        max_steps=-1,
        warmup_ratio=0.03,
        group_by_length=True,
        lr_scheduler_type="constant",
        report_to="wandb" if os.getenv("WANDB_API_KEY") else "none",
        remove_unused_columns=False,
    )
    
    # Trainer
    print("🎯 Khởi tạo trainer...")
    trainer = SFTTrainer(
        model=model,
        train_dataset=dataset,
        peft_config=peft_config,
        dataset_text_field="text",
        max_seq_length=2048,
        tokenizer=tokenizer,
        args=training_args,
        packing=False,
    )
    
    # Bắt đầu training
    print("🔥 Bắt đầu training...")
    trainer.train()
    
    # Lưu model
    print("💾 Lưu model...")
    trainer.save_model()
    
    print("🎉 Fine-tuning hoàn thành!")
    print("📁 Model được lưu tại: ./mistral-environmental-stories")

def test_model():
    """Test model sau khi fine-tuning"""
    print("🧪 Testing fine-tuned model...")
    
    # Load fine-tuned model
    model = AutoModelForCausalLM.from_pretrained(
        "./mistral-environmental-stories",
        torch_dtype=torch.float16,
        device_map="auto"
    )
    tokenizer = AutoTokenizer.from_pretrained("./mistral-environmental-stories")
    
    # Test cases
    test_cases = [
        "Tên thẻ: Trồng Rừng Đầu Nguồn. Loại: Bảo Vệ. Hiệu ứng: +2 điểm cho Rừng.",
        "Tên thẻ: Cháy rừng. Loại: Thiên Tai. Hiệu ứng: -2 điểm Rừng.",
        "Tên thẻ: Tuyên Truyền. Loại: Cộng Đồng. Hiệu ứng: Gấp đôi điểm các thẻ cộng điểm trong lượt sau."
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n--- Test Case {i} ---")
        print(f"Input: {test_case}")
        
        prompt = f"<|system|>\nBạn là một AI chuyên tạo câu chuyện về bảo vệ môi trường.\n<|end|>\n<|user|>\n{test_case}\n<|end|>\n<|assistant|>\n"
        
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=100,
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        story = response.split("<|assistant|>\n")[-1].strip()
        
        print(f"Output: {story}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        test_model()
    else:
        main() 