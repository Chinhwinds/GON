# Fine-tuning Mistral 7B cho GON Environmental Stories

## 🎯 Mục tiêu

Fine-tune mô hình Mistral 7B để tạo câu chuyện môi trường tự nhiên và sinh động từ thẻ bài trong game GON.

## 📁 Files đã tạo

- `fine_tuning_data.jsonl` - Dataset training (24 mẫu)
- `train_mistral.py` - Script training chính
- `generate_fine_tuning_data.py` - Script tạo dataset
- `integrate_model.py` - API server để tích hợp với React app
- `requirements_finetune.txt` - Dependencies cần thiết
- `fine_tuning_guide.md` - Hướng dẫn chi tiết

## 🚀 Quick Start

### 1. Cài đặt môi trường

```bash
# Tạo virtual environment
python -m venv mistral_env
source mistral_env/bin/activate  # Linux/Mac
# hoặc
mistral_env\Scripts\activate     # Windows

# Cài đặt dependencies
pip install -r requirements_finetune.txt
```

### 2. Chạy Fine-tuning

```bash
# Chạy training
python train_mistral.py

# Test model sau khi training
python train_mistral.py test
```

### 3. Chạy API Server

```bash
# Khởi động API server
python integrate_model.py
```

## 📊 Dataset

Dataset hiện tại có 24 mẫu training:

- **8 thẻ Bảo Vệ**: Trồng rừng, đập ngăn mặn, phân loại rác,...
- **8 thẻ Cộng Đồng**: Sản phẩm xanh, tuyên truyền, giảm nhựa,...
- **8 thẻ Thiên Tai**: Sạt lở, lũ quét, cháy rừng,...

## 🔧 Cấu hình Training

- **Model**: Mistral 7B v0.1
- **Method**: LoRA (Low-Rank Adaptation)
- **Quantization**: 4-bit để tiết kiệm VRAM
- **Epochs**: 3
- **Learning Rate**: 2e-4
- **Batch Size**: 4

## 💻 Yêu cầu hệ thống

- **GPU**: 24GB+ VRAM (A100, V100, RTX 4090)
- **RAM**: 64GB+
- **Storage**: 100GB+ free space

## 🔄 Integration với React App

### 1. Load Model

```javascript
const response = await fetch("/api/load-model", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ model_path: "./mistral-environmental-stories" }),
});
```

### 2. Generate Story

```javascript
const response = await fetch("/api/generate-story", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    card_sequence: [
      "Tên thẻ: Trồng Rừng Đầu Nguồn. Loại: Bảo Vệ. Hiệu ứng: +2 điểm cho Rừng.",
    ],
    story_type: "adventure",
    length: "medium",
    temperature: 0.7,
  }),
});
```

## 📈 Kết quả mong đợi

Sau khi fine-tuning, model sẽ:

- ✅ Tạo câu chuyện tự nhiên từ thông tin thẻ bài
- ✅ Duy trì phong cách kể chuyện nhất quán
- ✅ Tích hợp hiệu ứng game mượt mà
- ✅ Tạo nội dung giáo dục chất lượng cao

## 🎮 Sử dụng trong Game

1. Người chơi chọn thẻ bài theo thứ tự
2. Gửi thông tin thẻ đến API
3. Nhận câu chuyện môi trường được tạo tự động
4. Hiển thị câu chuyện với giao diện đẹp

## 🔍 Troubleshooting

### Lỗi VRAM không đủ

- Giảm batch size xuống 2
- Sử dụng gradient checkpointing
- Tăng gradient accumulation steps

### Lỗi loading model

- Kiểm tra đường dẫn model
- Đảm bảo đã download Mistral 7B
- Kiểm tra quyền truy cập file

### Lỗi training

- Kiểm tra format dataset
- Đảm bảo đủ disk space
- Kiểm tra GPU drivers

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:

1. Logs trong console
2. GPU memory usage
3. Dataset format
4. Dependencies versions
