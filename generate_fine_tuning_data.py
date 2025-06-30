import json

# Training data from user
training_data = [
    {
        "input": "Tên thẻ: Trồng Rừng Đầu Nguồn. Loại: Bảo Vệ. Hiệu ứng: +2 điểm cho Rừng.",
        "output": "Người dân cùng nhau trồng cây ở đầu nguồn rừng. Những mầm cây non dần lớn lên, giúp ngăn xói mòn và tăng 2 điểm cho khu rừng."
    },
    {
        "input": "Tên thẻ: Đập Ngăn Mặn. Loại: Bảo Vệ. Hiệu ứng: +2 điểm cho Sông.",
        "output": "Việc xây đập ngăn mặn giúp giữ lại nguồn nước ngọt, tăng 2 điểm cho vùng sông và cải thiện sinh hoạt của người dân."
    },
    {
        "input": "Tên thẻ: Phân Loại Rác. Loại: Bảo Vệ. Hiệu ứng: +2 điểm cho Làng.",
        "output": "Người dân bắt đầu phân loại rác đúng cách. Nhờ đó, môi trường làng quê sạch hơn, nâng +2 điểm cho Làng."
    },
    {
        "input": "Tên thẻ: Chống xói mòn núi. Loại: Bảo Vệ. Hiệu ứng: +2 điểm cho Đất.",
        "output": "Người dân gia cố đất núi bằng cây chắn gió và bậc thang. Nhờ đó, vùng núi tránh được sạt lở, tăng 2 điểm cho Đất."
    },
    {
        "input": "Tên thẻ: Phân bón hữu cơ. Loại: Bảo Vệ. Hiệu ứng: +2 điểm cho Đất, +1 điểm cho Sông.",
        "output": "Sử dụng phân bón hữu cơ làm đất màu mỡ hơn, ít gây ô nhiễm nguồn nước, mang lại +2 điểm Đất và +1 điểm cho Sông."
    },
    {
        "input": "Tên thẻ: Tuần Tra Rừng. Loại: Bảo Vệ. Hiệu ứng: +2 điểm Rừng, +1 điểm Đất.",
        "output": "Các đội tuần tra kiểm soát rừng thường xuyên, ngăn chặn phá rừng trái phép. Nhờ đó, Rừng +2 điểm, Đất +1 điểm."
    },
    {
        "input": "Tên thẻ: Tiết kiệm nước. Loại: Bảo Vệ. Hiệu ứng: +2 điểm Sông, +1 điểm Làng.",
        "output": "Người dân sử dụng vòi tiết kiệm nước và tái sử dụng nước mưa, giúp Sông +2 điểm và Làng +1 điểm."
    },
    {
        "input": "Tên thẻ: Dùng năng lượng xanh. Loại: Bảo Vệ. Hiệu ứng: +2 điểm Làng, +1 điểm Rừng.",
        "output": "Nhà làng được lắp đặt pin mặt trời và tuabin gió, giảm phát thải và tăng 2 điểm cho Làng, 1 điểm cho Rừng."
    },
    {
        "input": "Tên thẻ: Sản Phẩm Xanh. Loại: Cộng Đồng. Hiệu ứng: Giảm thiệt hại trừ điểm đi một nửa trong 3 lượt.",
        "output": "Người dân sử dụng sản phẩm xanh, thân thiện môi trường. Nhờ đó, tác hại từ thiên tai trong 3 lượt kế tiếp bị giảm một nửa."
    },
    {
        "input": "Tên thẻ: Tuyên Truyền. Loại: Cộng Đồng. Hiệu ứng: Gấp đôi điểm các thẻ cộng điểm trong lượt sau.",
        "output": "Chiến dịch tuyên truyền bảo vệ môi trường lan rộng, khiến mọi hành động tích cực ở lượt sau có hiệu quả gấp đôi."
    },
    {
        "input": "Tên thẻ: Giảm Nhựa. Loại: Cộng Đồng. Hiệu ứng: Chặn 1 hiệu ứng trừ điểm bất kỳ trong lượt kế tiếp.",
        "output": "Cả làng cam kết giảm nhựa dùng một lần, giúp chặn đứng một thiên tai gây trừ điểm trong lượt kế tiếp."
    },
    {
        "input": "Tên thẻ: Tiết kiệm tài nguyên. Loại: Cộng Đồng. Hiệu ứng: Rút thêm 2 lá.",
        "output": "Cộng đồng tiết kiệm tài nguyên giúp hệ thống hoạt động hiệu quả hơn, cho phép bạn rút thêm 2 lá bài mới."
    },
    {
        "input": "Tên thẻ: Sự Hờ Hững. Loại: Cộng Đồng. Hiệu ứng: Vô hiệu các lá Bảo Vệ trong lượt tới.",
        "output": "Do sự hờ hững của cộng đồng, các nỗ lực bảo vệ môi trường bị lãng quên. Tất cả thẻ Bảo Vệ bị vô hiệu trong lượt tới."
    },
    {
        "input": "Tên thẻ: Lợi Dụng. Loại: Cộng Đồng. Hiệu ứng: Hủy 1 lá của đối phương và +1 điểm.",
        "output": "Bạn lợi dụng sơ hở để hủy bỏ 1 lá bài của đối thủ và nhận +1 điểm cho mình."
    },
    {
        "input": "Tên thẻ: Phá Hoại. Loại: Cộng Đồng. Hiệu ứng: Chọn 1 vùng của đối phương: -2 điểm.",
        "output": "Hành động phá hoại khiến 1 vùng của đối thủ bị tổn thất nghiêm trọng, trừ 2 điểm."
    },
    {
        "input": "Tên thẻ: Lãng Phí. Loại: Cộng Đồng. Hiệu ứng: Nếu đối phương không dùng thẻ Bảo Vệ ở lượt tới, -2 điểm.",
        "output": "Nếu lượt kế đối thủ không bảo vệ vùng nào, sự lãng phí khiến 1 vùng của họ bị trừ 2 điểm."
    },
    {
        "input": "Tên thẻ: Sạt lở đất. Loại: Thiên Tai. Hiệu ứng: -2 điểm Đất.",
        "output": "Mưa lớn kéo dài gây sạt lở đất, khiến vùng Đất mất đi 2 điểm."
    },
    {
        "input": "Tên thẻ: Lũ quét. Loại: Thiên Tai. Hiệu ứng: -2 điểm Sông.",
        "output": "Nước lũ đột ngột tràn về, gây tổn thất nặng nề cho dòng Sông, trừ 2 điểm."
    },
    {
        "input": "Tên thẻ: Cháy rừng. Loại: Thiên Tai. Hiệu ứng: -2 điểm Rừng.",
        "output": "Lửa lan nhanh khắp rừng do thời tiết khô hạn. Rừng mất đi 2 điểm quý giá."
    },
    {
        "input": "Tên thẻ: Đô Thị Ô Nhiễm. Loại: Thiên Tai. Hiệu ứng: -2 điểm Làng.",
        "output": "Khói bụi và rác thải công nghiệp làm làng quê ô nhiễm, giảm 2 điểm cho Làng."
    },
    {
        "input": "Tên thẻ: Biến đổi Khí Hậu. Loại: Thiên Tai. Hiệu ứng: Mỗi vùng có trên 3 điểm bị trừ 2.",
        "output": "Nhiệt độ tăng cao, khí hậu biến đổi khiến mọi vùng mạnh (trên 3 điểm) đều bị giảm 2 điểm."
    },
    {
        "input": "Tên thẻ: Nước biển dâng. Loại: Thiên Tai. Hiệu ứng: Mỗi vùng dưới 5 điểm bị trừ 1.",
        "output": "Nước biển dâng nhấn chìm vùng thấp yếu, các vùng dưới 5 điểm bị trừ 1."
    },
    {
        "input": "Tên thẻ: Phá rừng ồ ạt. Loại: Thiên Tai. Hiệu ứng: Người chơi điểm cao nhất bị trừ 2.",
        "output": "Nạn phá rừng nghiêm trọng khiến người chơi có điểm cao nhất mất 2 điểm vì hậu quả rõ rệt nhất."
    },
    {
        "input": "Tên thẻ: Khói bụi đô thị. Loại: Thiên Tai. Hiệu ứng: Mỗi người chơi chọn 1 vùng của chính mình bị trừ 2.",
        "output": "Ô nhiễm không khí buộc mỗi người chơi phải hy sinh một vùng, mỗi vùng được chọn mất đi 2 điểm."
    }
]

# System prompt for fine-tuning
system_prompt = "Bạn là một AI chuyên tạo câu chuyện về bảo vệ môi trường dựa trên thẻ bài. Hãy tạo câu chuyện ngắn gọn, sinh động và có ý nghĩa giáo dục về môi trường."

# Generate JSONL format for fine-tuning
def generate_jsonl_data():
    with open('fine_tuning_data.jsonl', 'w', encoding='utf-8') as f:
        for item in training_data:
            jsonl_entry = {
                "messages": [
                    {
                        "role": "system",
                        "content": system_prompt
                    },
                    {
                        "role": "user",
                        "content": item["input"]
                    },
                    {
                        "role": "assistant",
                        "content": item["output"]
                    }
                ]
            }
            f.write(json.dumps(jsonl_entry, ensure_ascii=False) + '\n')

if __name__ == "__main__":
    generate_jsonl_data()
    print("Fine-tuning data generated successfully!")
    print(f"Total training examples: {len(training_data)}") 