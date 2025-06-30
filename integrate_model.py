import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import json
from typing import List, Dict, Optional
import os

class EnvironmentalStoryGenerator:
    """Class để tạo câu chuyện môi trường sử dụng fine-tuned Mistral model"""
    
    def __init__(self, model_path: str = "./mistral-environmental-stories"):
        """
        Khởi tạo story generator
        
        Args:
            model_path: Đường dẫn đến fine-tuned model
        """
        self.model_path = model_path
        self.model = None
        self.tokenizer = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        
    def load_model(self):
        """Load fine-tuned model và tokenizer"""
        try:
            print(f"🤖 Loading model from {self.model_path}...")
            
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_path,
                torch_dtype=torch.float16,
                device_map="auto" if self.device == "cuda" else None
            )
            
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_path)
            
            if self.device == "cpu":
                self.model = self.model.to(self.device)
            
            print("✅ Model loaded successfully!")
            return True
            
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            return False
    
    def generate_single_story(self, card_info: str, temperature: float = 0.7) -> str:
        """
        Tạo câu chuyện từ thông tin một thẻ
        
        Args:
            card_info: Thông tin thẻ (tên, loại, hiệu ứng)
            temperature: Độ sáng tạo của model (0.0-1.0)
            
        Returns:
            Câu chuyện được tạo
        """
        if self.model is None or self.tokenizer is None:
            return "Model chưa được load. Vui lòng gọi load_model() trước."
        
        try:
            # Tạo prompt
            system_prompt = "Bạn là một AI chuyên tạo câu chuyện về bảo vệ môi trường dựa trên thẻ bài. Hãy tạo câu chuyện ngắn gọn, sinh động và có ý nghĩa giáo dục về môi trường."
            
            prompt = f"<|system|>\n{system_prompt}\n<|end|>\n<|user|>\n{card_info}\n<|end|>\n<|assistant|>\n"
            
            # Tokenize
            inputs = self.tokenizer(prompt, return_tensors="pt")
            if self.device == "cuda":
                inputs = {k: v.to(self.device) for k, v in inputs.items()}
            
            # Generate
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    max_new_tokens=100,
                    temperature=temperature,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id,
                    eos_token_id=self.tokenizer.eos_token_id
                )
            
            # Decode response
            response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            story = response.split("<|assistant|>\n")[-1].strip()
            
            return story
            
        except Exception as e:
            print(f"❌ Error generating story: {e}")
            return f"Lỗi khi tạo câu chuyện: {e}"
    
    def generate_sequence_story(self, card_sequence: List[str], story_type: str = "adventure", 
                               length: str = "medium", temperature: float = 0.7) -> Dict:
        """
        Tạo câu chuyện từ chuỗi thẻ bài
        
        Args:
            card_sequence: Danh sách thông tin thẻ theo thứ tự
            story_type: Loại câu chuyện (adventure, educational, heroic)
            length: Độ dài (short, medium, long)
            temperature: Độ sáng tạo
            
        Returns:
            Dict chứa title, content, moral
        """
        if not card_sequence:
            return {
                "title": "Không có thẻ nào được chọn",
                "content": "Vui lòng chọn ít nhất một thẻ để tạo câu chuyện.",
                "moral": "Hãy bắt đầu với những hành động nhỏ để bảo vệ môi trường."
            }
        
        try:
            # Tạo prompt cho chuỗi thẻ
            card_info = " | ".join(card_sequence)
            
            # Thêm context về loại câu chuyện
            story_context = {
                "adventure": "Tạo câu chuyện phiêu lưu về hành trình bảo vệ môi trường",
                "educational": "Tạo câu chuyện giáo dục về bài học bảo vệ môi trường", 
                "heroic": "Tạo câu chuyện anh hùng về cuộc chiến bảo vệ thiên nhiên"
            }
            
            length_context = {
                "short": "Ngắn gọn (1-2 câu)",
                "medium": "Chi tiết vừa phải (2-3 câu)",
                "long": "Chi tiết đầy đủ (3-4 câu)"
            }
            
            enhanced_prompt = f"{card_info}\n\nLoại câu chuyện: {story_context.get(story_type, '')}\nĐộ dài: {length_context.get(length, '')}"
            
            # Generate story
            story_content = self.generate_single_story(enhanced_prompt, temperature)
            
            # Generate title và moral
            title = self._generate_title(story_type, length)
            moral = self._generate_moral()
            
            return {
                "title": title,
                "content": story_content,
                "moral": moral,
                "cardSequence": card_sequence
            }
            
        except Exception as e:
            print(f"❌ Error generating sequence story: {e}")
            return {
                "title": "Lỗi khi tạo câu chuyện",
                "content": f"Có lỗi xảy ra: {e}",
                "moral": "Hãy thử lại sau.",
                "cardSequence": card_sequence
            }
    
    def _generate_title(self, story_type: str, length: str) -> str:
        """Tạo tiêu đề câu chuyện"""
        titles = {
            "adventure": {
                "short": "Cuộc Phiêu Lưu Xanh Nhỏ",
                "medium": "Hành Trình Bảo Vệ Làng Xanh", 
                "long": "Sứ Mệnh Cứu Lấy Thành Phố Xanh"
            },
            "educational": {
                "short": "Bài Học Môi Trường Đầu Tiên",
                "medium": "Chương Trình Giáo Dục Xanh",
                "long": "Dự Án Thế Hệ Xanh Toàn Quốc"
            },
            "heroic": {
                "short": "Những Anh Hùng Xanh Nhỏ",
                "medium": "Cuộc Chiến Bảo Vệ Môi Trường",
                "long": "Sứ Mệnh Cứu Lấy Hành Tinh Xanh"
            }
        }
        
        return titles.get(story_type, {}).get(length, "Câu Chuyện Bảo Vệ Môi Trường")
    
    def _generate_moral(self) -> str:
        """Tạo bài học đạo đức"""
        morals = [
            "Bảo vệ môi trường là trách nhiệm của mỗi người chúng ta, bắt đầu từ những hành động nhỏ nhất.",
            "Những hành động nhỏ có thể tạo ra thay đổi lớn cho thiên nhiên và tương lai của chúng ta.",
            "Thiên nhiên là ngôi nhà chung, hãy cùng nhau bảo vệ và gìn giữ cho thế hệ mai sau.",
            "Mỗi hành động bảo vệ môi trường đều có ý nghĩa sâu sắc và tác động lâu dài đến cuộc sống.",
            "Tương lai xanh bắt đầu từ những hành động hôm nay, mỗi người đều có thể trở thành anh hùng môi trường."
        ]
        
        import random
        return random.choice(morals)

# API Server cho React app
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Global story generator
story_generator = None

@app.route('/api/load-model', methods=['POST'])
def load_model():
    """API endpoint để load model"""
    global story_generator
    
    try:
        data = request.get_json()
        model_path = data.get('model_path', './mistral-environmental-stories')
        
        story_generator = EnvironmentalStoryGenerator(model_path)
        success = story_generator.load_model()
        
        return jsonify({
            'success': success,
            'message': 'Model loaded successfully' if success else 'Failed to load model'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error: {str(e)}'
        }), 500

@app.route('/api/generate-story', methods=['POST'])
def generate_story():
    """API endpoint để tạo câu chuyện"""
    global story_generator
    
    if story_generator is None:
        return jsonify({
            'success': False,
            'message': 'Model not loaded. Please load model first.'
        }), 400
    
    try:
        data = request.get_json()
        card_sequence = data.get('card_sequence', [])
        story_type = data.get('story_type', 'adventure')
        length = data.get('length', 'medium')
        temperature = data.get('temperature', 0.7)
        
        result = story_generator.generate_sequence_story(
            card_sequence, story_type, length, temperature
        )
        
        return jsonify({
            'success': True,
            'story': result
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error generating story: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': story_generator is not None
    })

if __name__ == '__main__':
    print("🚀 Starting Environmental Story Generator API Server...")
    print("📖 Endpoints:")
    print("  POST /api/load-model - Load fine-tuned model")
    print("  POST /api/generate-story - Generate environmental story")
    print("  GET  /api/health - Health check")
    
    app.run(host='0.0.0.0', port=5000, debug=True) 