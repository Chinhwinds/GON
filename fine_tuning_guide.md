# Fine-tuning Mistral 7B cho Tạo Câu Chuyện Môi Trường

## 📋 Tổng quan

Hướng dẫn fine-tuning mô hình Mistral 7B để tạo câu chuyện về bảo vệ môi trường dựa trên thẻ bài trong game GON.

## 🎯 Mục tiêu

- Tạo câu chuyện sinh động, tự nhiên từ thông tin thẻ bài
- Duy trì phong cách kể chuyện nhất quán
- Tích hợp hiệu ứng game vào câu chuyện một cách mượt mà
- Tạo ra nội dung giáo dục về môi trường

## 📊 Dataset

### Format dữ liệu

- **File**: `fine_tuning_data.jsonl`
- **Format**: JSONL (JSON Lines)
- **Cấu trúc**: Chat format với system, user, assistant messages

### Thống kê dataset

- **Tổng số mẫu**: 24
- **Loại thẻ**: Bảo Vệ (8), Cộng Đồng (8), Thiên Tai (8)
- **Độ dài câu chuyện**: 1-2 câu ngắn gọn

## 🛠️ Cấu hình Fine-tuning

### 1. Yêu cầu hệ thống

```bash
# GPU requirements
- VRAM: 24GB+ (A100, V100, RTX 4090)
- RAM: 64GB+
- Storage: 100GB+ free space
```

### 2. Cài đặt môi trường

```bash
# Tạo virtual environment
python -m venv mistral_finetune
source mistral_finetune/bin/activate  # Linux/Mac
# hoặc
mistral_finetune\Scripts\activate     # Windows

# Cài đặt dependencies
pip install torch transformers datasets accelerate
pip install peft bitsandbytes wandb
pip install trl sentencepiece
```

### 3. Script Fine-tuning

Tạo file `train_mistral.py`:

```python
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
import os

# Cấu hình quantization
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=False,
)

# Load model và tokenizer
model_name = "mistralai/Mistral-7B-v0.1"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
    torch_dtype=torch.float16,
)
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token

# Cấu hình LoRA
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
    report_to="wandb"
)

# Trainer
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
trainer.train()

# Lưu model
trainer.save_model()
```

### 4. Cấu hình Dataset

Tạo file `dataset_config.py`:

```python
from datasets import Dataset
import json

def load_training_data():
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

# Load dataset
dataset = load_training_data()
```

## 🚀 Chạy Fine-tuning

```bash
# Chạy training
python train_mistral.py

# Monitor với wandb
wandb login
```

## 📈 Hyperparameters được khuyến nghị

| Parameter     | Value | Mô tả                                |
| ------------- | ----- | ------------------------------------ |
| Learning Rate | 2e-4  | Tốc độ học phù hợp cho LoRA          |
| Batch Size    | 4     | Phù hợp với VRAM 24GB                |
| Epochs        | 3     | Đủ để học pattern mà không overfit   |
| LoRA Rank     | 64    | Cân bằng giữa hiệu quả và chất lượng |
| LoRA Alpha    | 16    | Scaling factor cho LoRA              |
| Warmup Ratio  | 0.03  | 3% steps cho warmup                  |

## 🔧 Tối ưu hóa

### 1. Data Augmentation

```python
# Tạo thêm dữ liệu bằng cách biến thể
def augment_data(original_data):
    augmented = []
    for item in original_data:
        # Thêm biến thể với từ đồng nghĩa
        # Thay đổi cấu trúc câu
        # Thêm chi tiết môi trường
        pass
    return augmented
```

### 2. Prompt Engineering

```python
# Cải thiện system prompt
system_prompt = """
Bạn là một AI chuyên tạo câu chuyện về bảo vệ môi trường dựa trên thẻ bài.
Hãy tạo câu chuyện:
- Ngắn gọn (1-2 câu)
- Sinh động với chi tiết cụ thể
- Có ý nghĩa giáo dục về môi trường
- Tích hợp hiệu ứng game một cách tự nhiên
- Sử dụng ngôn ngữ phù hợp với trẻ em
"""
```

## 📊 Đánh giá Model

### 1. Metrics

- **Perplexity**: Độ phức tạp của model
- **BLEU Score**: Độ chính xác của output
- **Human Evaluation**: Đánh giá chất lượng câu chuyện

### 2. Test Cases

```python
test_cases = [
    "Tên thẻ: Trồng Rừng Đầu Nguồn. Loại: Bảo Vệ. Hiệu ứng: +2 điểm cho Rừng.",
    "Tên thẻ: Cháy rừng. Loại: Thiên Tai. Hiệu ứng: -2 điểm Rừng.",
    # Thêm test cases khác
]
```

## 🔄 Integration với App

### 1. Load Fine-tuned Model

```python
def load_fine_tuned_model():
    model = AutoModelForCausalLM.from_pretrained(
        "./mistral-environmental-stories",
        torch_dtype=torch.float16,
        device_map="auto"
    )
    tokenizer = AutoTokenizer.from_pretrained("./mistral-environmental-stories")
    return model, tokenizer
```

### 2. Generate Story

```python
def generate_story(card_info, model, tokenizer):
    prompt = f"<|system|>\nBạn là một AI chuyên tạo câu chuyện về bảo vệ môi trường.\n<|end|>\n<|user|>\n{card_info}\n<|end|>\n<|assistant|>\n"

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
    return response.split("<|assistant|>\n")[-1].strip()
```

## 📝 Checklist Fine-tuning

- [ ] Chuẩn bị dataset đầy đủ
- [ ] Cài đặt môi trường
- [ ] Cấu hình hyperparameters
- [ ] Chạy training
- [ ] Đánh giá model
- [ ] Tối ưu hóa nếu cần
- [ ] Test integration
- [ ] Deploy

## 🎯 Kết quả mong đợi

Sau khi fine-tuning, model sẽ có khả năng:

- Tạo câu chuyện tự nhiên từ thông tin thẻ bài
- Duy trì phong cách nhất quán
- Tích hợp hiệu ứng game mượt mà
- Tạo nội dung giáo dục chất lượng cao
