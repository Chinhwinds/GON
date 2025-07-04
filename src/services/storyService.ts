import type { Card } from "../data/cards";

interface StoryRequest {
  prompt: string;
  cards: Card[];
}

interface StoryResponse {
  response: string;
}

// Mock story generation service
// In a real application, this would call an actual AI API
export const generateStory = async (
  request: StoryRequest
): Promise<StoryResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { cards } = request;

  // Create a simple story based on the cards
  const protectionCards = cards.filter((card) => card.type === "Bảo Vệ");
  const communityCards = cards.filter((card) => card.type === "Cộng Đồng");
  const disasterCards = cards.filter((card) => card.type === "Thiên Tai");

  let story = "";
  let lesson = "";

  if (protectionCards.length > 0 && disasterCards.length > 0) {
    story = `Trong một ngôi làng nhỏ ven biển, thiên tai đã ập đến với sức mạnh khủng khiếp. ${disasterCards
      .map((card) => card.name)
      .join(
        ", "
      )} đã gây ra những thiệt hại nặng nề cho môi trường. Tuy nhiên, người dân làng không cam chịu. Họ đã cùng nhau thực hiện các biện pháp bảo vệ như ${protectionCards
      .map((card) => card.name)
      .join(", ")} để khôi phục và bảo vệ môi trường.`;

    lesson =
      "Thiên tai có thể gây ra thiệt hại lớn, nhưng với sự đoàn kết và các hành động bảo vệ môi trường, chúng ta có thể vượt qua và xây dựng lại một tương lai xanh hơn.";
  } else if (protectionCards.length > 0) {
    story = `Một cộng đồng đã nhận ra tầm quan trọng của việc bảo vệ môi trường. Họ đã thực hiện các hành động tích cực như ${protectionCards
      .map((card) => card.name)
      .join(
        ", "
      )} để bảo vệ thiên nhiên và tạo ra một môi trường sống tốt hơn cho thế hệ tương lai.`;

    lesson =
      "Bảo vệ môi trường không phải là trách nhiệm của một cá nhân mà là của toàn cộng đồng. Mỗi hành động nhỏ đều có ý nghĩa lớn.";
  } else if (communityCards.length > 0) {
    story = `Cộng đồng đã đối mặt với những thách thức về môi trường. Một số người đã thực hiện các hành động tích cực như ${communityCards
      .filter(
        (card) =>
          !card.name.includes("Hờ Hững") &&
          !card.name.includes("Phá Hoại") &&
          !card.name.includes("Lãng Phí")
      )
      .map((card) => card.name)
      .join(
        ", "
      )}, trong khi một số khác lại có những hành vi tiêu cực như ${communityCards
      .filter(
        (card) =>
          card.name.includes("Hờ Hững") ||
          card.name.includes("Phá Hoại") ||
          card.name.includes("Lãng Phí")
      )
      .map((card) => card.name)
      .join(", ")}.`;

    lesson =
      "Sự lựa chọn của mỗi cá nhân trong cộng đồng đều ảnh hưởng đến môi trường. Chúng ta cần lan tỏa những hành động tích cực và thay đổi những hành vi tiêu cực.";
  } else if (disasterCards.length > 0) {
    story = `Thiên nhiên đã giáng xuống những đòn đau đớn. ${disasterCards
      .map((card) => card.name)
      .join(
        ", "
      )} đã gây ra những thiệt hại không thể đo đếm được cho môi trường và cuộc sống của con người.`;

    lesson =
      "Thiên tai là hậu quả của việc con người không bảo vệ môi trường. Chúng ta cần hành động ngay hôm nay để tránh những thảm họa trong tương lai.";
  } else {
    story =
      "Chưa có đủ thông tin để tạo câu chuyện. Vui lòng chọn thêm các thẻ bài khác nhau.";
    lesson =
      "Mỗi loại thẻ bài đại diện cho những hành động khác nhau. Hãy kết hợp chúng để tạo ra câu chuyện có ý nghĩa.";
  }

  return {
    response: `CÂU CHUYỆN:\n${story}\n\nBÀI HỌC:\n${lesson}`,
  };
};

// Alternative: Call external AI API (uncomment and configure as needed)
/*
export const generateStoryWithAI = async (request: StoryRequest): Promise<StoryResponse> => {
  try {
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
};
*/
