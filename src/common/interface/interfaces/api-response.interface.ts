export interface ApiResponse<T> {
  status: number;        // HTTP 상태 코드
  success: boolean;      // 요청 성공 여부
  data?: T;             // 실제 데이터 (성공 시)
  error?: {             // 에러 정보 (실패 시)
    code: string;       // 에러 코드
    message: string;    // 에러 메시지
  };
  timestamp: string;    // 응답 시간
}