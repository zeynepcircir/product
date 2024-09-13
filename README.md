# ProductListApp

Bu proje [Angular CLI](https://github.com/angular/angular-cli) kullanılarak Angular sürüm 14.1.3 ile oluşturulmuştur.

## Özellikler
- **Ürün Ekleme**: Projede veriler LOCAL STORAGE'da tutulmaktadır, kendiniz ürün ekleyerek deneyebilirsiniz.
- **Görsel Ekleme**: Ürün ekleme butonu üzerinden ulaşabileceğiniz modalde görsel eklerken seçtiğiniz görselin butonun üstüne tıklayarak önizlemesini görebilirsiniz, böylece görsel kaydedilmiş olacaktır..
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

Ürün listesi için örnek veriler, bu verileri local storage'a ekleyebilirsiniz(görselleri kendiniz eklemelisiniz).

```json
[
    {
        "id": 1,
        "category": "Laptops",
        "description": "A high-performance laptop suitable for gaming and professional work.",
        "image": "https://example.com/laptop1.jpg",
        "price": "1200",
        "title": "Gaming Laptop Pro",
        "rating": 4.5
    },
    {
        "id": 2,
        "category": "Smartphones",
        "description": "A sleek and powerful smartphone with a top-tier camera.",
        "image": "https://example.com/smartphone1.jpg",
        "price": "900",
        "title": "Smartphone X",
        "rating": 4.2
    },
    {
        "id": 3,
        "category": "Headphones",
        "description": "Noise-cancelling wireless headphones with superior sound quality.",
        "image": "https://example.com/headphones1.jpg",
        "price": "250",
        "title": "Wireless Headphones",
        "rating": 4.8
    }
]

## Development Server

Geliştirme sunucusunu başlatmak için `ng serve` komutunu çalıştırın. `http://localhost:4200/` adresine gidin. Uygulama, kaynak dosyalarında yapılan değişiklikler sonrası otomatik olarak yeniden yüklenecektir.

## Kod Üretimi

Yeni bir bileşen oluşturmak için `ng generate component component-name` komutunu çalıştırın. Ayrıca `ng generate directive|pipe|service|class|guard|interface|enum|module` komutlarını da kullanabilirsiniz.

## Derleme

Projeyi derlemek için `ng build` komutunu çalıştırın. Derleme çıktıları `dist/` dizininde saklanacaktır.

## Birim Testlerini Çalıştırma

Birim testlerini çalıştırmak için `ng test` komutunu kullanarak [Karma](https://karma-runner.github.io) aracılığıyla testleri yürütebilirsiniz.

## Uçtan Uca Testleri Çalıştırma

Uçtan uca testleri çalıştırmak için `ng e2e` komutunu kullanın. Bu komutu çalıştırmadan önce uçtan uca test yeteneklerini sağlayan bir paketi eklemeniz gerekmektedir.

## Yardım

Angular CLI ile ilgili daha fazla yardım almak için `ng help` komutunu çalıştırabilir veya [Angular CLI Genel Bakış ve Komut Referansı](https://angular.io/cli) sayfasını inceleyebilirsiniz.
