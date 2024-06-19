'use server';

export async function WriteSubmitAction(
  title: string,
  tags: string[],
  content: string,
  summary: string,
) {
  try {
    switch (true) {
      case !title:
        return {
          success: false,
          message: '제목을 입력해주세요.',
        };
      case tags.length === 0:
        return {
          success: false,
          message: '태그를 입력해주세요.',
        };
      case !content:
        return {
          success: false,
          message: '내용을 입력해주세요.',
        };
      case !summary:
        return {
          success: false,
          message: '요약을 입력해주세요.',
        };
      default: {
        const response = await fetch('/write/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, summary, content, tags }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to submit content');
        }

        return {
          success: true,
          message: '포스팅을 완료했습니다.',
        };
      }
    }
  } catch (error) {
    console.error('Error submitting content:', error);
    return {
      success: false,
      message: '포스팅 중 오류가 발생했습니다.',
    };
  }
}
