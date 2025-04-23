import React from 'react';

const GoldInfo: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', lineHeight: 1.8 }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '20px' }}>📈 Giá Vàng XAU/USD Hôm Nay</h1>

      <p>
        Giá vàng (XAU/USD) là một trong những chỉ số quan trọng phản ánh sức khỏe nền kinh tế toàn cầu.
        Nhà đầu tư thường xem vàng như một kênh trú ẩn an toàn trong bối cảnh lạm phát cao, thị trường tài chính biến động hoặc bất ổn địa chính trị.
      </p>

      <h2>🟡 Tại sao giá vàng lại biến động?</h2>
      <p>
        Có nhiều yếu tố ảnh hưởng đến giá vàng, bao gồm:
      </p>
      <ul>
        <li>📊 Chính sách tiền tệ của Cục Dự trữ Liên bang Mỹ (Fed)</li>
        <li>💹 Lãi suất và tỷ giá USD</li>
        <li>🌍 Tình hình kinh tế và địa chính trị toàn cầu</li>
        <li>🏦 Nhu cầu vàng vật chất từ ngân hàng trung ương, quỹ ETF và cá nhân</li>
      </ul>

      <h2>💡 Xu hướng hiện tại</h2>
      <p>
        Trong thời gian gần đây, giá vàng dao động quanh mức <strong>2,000 USD/ounce</strong>
        do lo ngại lạm phát kéo dài và kỳ vọng Fed sẽ duy trì lãi suất cao.
        Nhiều chuyên gia dự đoán giá vàng sẽ còn tiếp tục biến động mạnh trong năm 2025.
      </p>

      <h2>🔮 Dự báo và chiến lược đầu tư</h2>
      <p>
        Đối với nhà đầu tư, việc theo dõi kỹ diễn biến giá vàng và kết hợp với phân tích kỹ thuật,
        tin tức kinh tế là điều cần thiết. Một số chiến lược phổ biến:
      </p>
      <ul>
        <li>Giao dịch ngắn hạn theo biểu đồ nến</li>
        <li>Giữ dài hạn nếu lạm phát có dấu hiệu gia tăng</li>
        <li>Phân bổ một phần tài sản vào vàng để phòng ngừa rủi ro</li>
      </ul>

      <p style={{ marginTop: '30px', fontStyle: 'italic' }}>
        Lưu ý: Bài viết chỉ mang tính chất tham khảo, không phải là khuyến nghị đầu tư.
      </p>
    </div>
  );
};

export default GoldInfo;
