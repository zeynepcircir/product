# ProductListApp

Bu proje [Angular CLI](https://github.com/angular/angular-cli) kullanılarak Angular sürüm 14.1.3 ile oluşturulmuştur.

## Özellikler
- **Ürün Ekleme**: Projede veriler Locale Storage'da tutulmaktadır, kendiniz ürün ekleyerek deneyebilirsiniz.
- **Görsel Ekleme**: Ürün ekleme butonuna tıkladığınızda açılan modalde, görsel eklerken seçtiğiniz görselin butonun üzerine tıklayarak önizlemesini görebilirsiniz. Bu işlemle görsel kaydedilecektir.
- **Navbar**: Kategori bağlantıları ve ürün listeleme sayfasına yönlendiren bir logo ile temel bir navigasyon çubuğu tasarlandı.
- **Ürün Listeleme**: Ürünler, sayfalama (pagination) ile 5'erli olarak listelendi.
- **Oylama ve Sıralama**: Ürünler için oylama ve sıralama özellikleri eklendi.
- **Ürün Ekleme**: "Yeni Ürün Ekle" butonuna tıklanarak modal ile açılan form sunuldu. Form doğrulamaları (validation) eklendi.
- **Toast Mesajı**: Ürün ekleme ve silme işlemlerinden sonra toast mesajları gösterildi.
- **Silme İşlemi**: Her ürün için silme butonu sağlandı, onay pop-up'ı ile silme işlemi gerçekleştirildi.
- **Arama ve Filtreleme**: Ürünler için arama ve filtreleme işlevleri eklendi.
- **Lazy Loading**: Ürün listesi için lazy loading uygulandı.
- **Mobil Uyumluluk**: Responsive ve mobil uyumlu tasarım sağlandı.
- **Birim Testleri**: `product-add` bileşeni için Jasmine ve Karma ile birim testleri yazıldı.
- **Modern JavaScript**: ES6+ özellikleri kullanılarak kod okunabilirliği artırıldı.

## Mock Data

Aşağıdaki örnek verileri Local Storage'a ekleyebilirsiniz (görselleri kendiniz eklemelisiniz).

```json
[
    {
        "id": 1,
        "category": "Laptops",
        "description": "A high performance laptop suitable for gaming and professional work.",
        "image": "https://example.com/laptop1.jpg",
        "price": "1200",
        "title": "Gaming Laptop Pro",
        "rating": 1
    },
    {
        "id": 2,
        "category": "Smartphones",
        "description": "A sleek and powerful smartphone with a top-tier camera.",
        "image": "https://example.com/smartphone1.jpg",
        "price": "900",
        "title": "Smartphone X",
        "rating": 3
    },
    {
        "id": 3,
        "category": "Cameras",
        "description": "Noise cancelling wireless headphones with superior sound quality.",
        "image": "https://example.com/headphones1.jpg",
        "price": "250",
        "title": "Wireless Headphones",
        "rating": 4
    }
]

