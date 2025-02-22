let myChart = null; // Biến lưu trữ biểu đồ

// Hàm vẽ biểu đồ
function renderChart(labels, principalData, interestData) {
  const ctx = document.getElementById('loan-chart').getContext('2d');

  // Hủy biểu đồ cũ nếu tồn tại
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Gốc (VNĐ)',
          data: principalData,
          backgroundColor: '#007bff',
        },
        {
          label: 'Lãi (VNĐ)',
          data: interestData,
          backgroundColor: '#28a745',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Kỳ Thanh Toán',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Số Tiền (VNĐ)',
          },
          beginAtZero: true,
        },
      },
    },
  });
}

// Hàm xuất PDF
function exportPDF() {
  const doc = new jspdf.jsPDF();
  const summary = document.getElementById('summary-result').innerText;
  const table = document.getElementById('detail-table');

  // Thêm tiêu đề
  doc.setFontSize(18);
  doc.text("Kết Quả Tính Toán Lãi Vay", 15, 20);

  // Thêm thông tin tổng hợp
  doc.setFontSize(12);
  const splitSummary = doc.splitTextToSize(summary, 180);
  doc.text(splitSummary, 15, 30);

  // Thêm bảng chi tiết
  doc.autoTable({
    html: '#detail-table',
    startY: 80,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [0, 123, 255] },
  });

  // Lưu file
  doc.save('ket-qua-lai-vay.pdf');
}

// Cập nhật hàm calculateLoan()
function calculateLoan() {
  // ... (giữ nguyên phần code cũ)

  // Chuẩn bị dữ liệu cho biểu đồ
  const labels = details.map((_, index) => `Kỳ ${index + 1}`);
  const principalData = details.map((d) => d.principal);
  const interestData = details.map((d) => d.interest);

  // Vẽ biểu đồ
  renderChart(labels, principalData, interestData);

  // Hiển thị kết quả
  displaySummary(loanAmount, totalInterest, totalPayment);
  displayDetails(details);
}