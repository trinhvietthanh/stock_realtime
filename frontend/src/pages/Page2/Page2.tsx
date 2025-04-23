import React from 'react';

const GoldTechnicalAnalysis: React.FC = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', padding: 20, lineHeight: 1.8 }}>
    <h1>📉 Phân Tích Kỹ Thuật Giá Vàng Hôm Nay</h1>
    <p>
      Trên khung thời gian H1, giá vàng đang tạo mô hình <strong>tam giác hội tụ</strong>,
      cho thấy sự giằng co giữa bên mua và bên bán. Nếu giá phá vỡ ngưỡng <strong>2,030 USD</strong>
      thì có khả năng tiếp tục xu hướng tăng.
    </p>
    <h2>🔍 Các vùng giá cần lưu ý</h2>
    <ul>
      <li>Kháng cự: 2,035 USD – 2,050 USD</li>
      <li>Hỗ trợ: 1,995 USD – 2,000 USD</li>
    </ul>
    <p>
      RSI hiện đang ở mức trung lập (~50), chưa cho tín hiệu quá mua hoặc quá bán.
      Chỉ báo MACD cho tín hiệu giao cắt nhẹ nhưng chưa rõ xu hướng mạnh.
    </p>
    <p style={{ fontStyle: 'italic' }}>Lưu ý: Phân tích kỹ thuật mang tính chất tham khảo và không phải là khuyến nghị đầu tư.</p>
  </div>
);

export default GoldTechnicalAnalysis;
