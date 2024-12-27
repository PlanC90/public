import { Observable } from '@nativescript/core';
import { Barcode } from '@nativescript/barcode-scanner';
import * as camera from '@nativescript/camera';
import * as productData from './data/products.json';

export class MainViewModel extends Observable {
  private _productInfo: string = 'Barkod taramak için butona tıklayın';
  private _productName: string = '';
  private _productPrice: string = '';
  private _hasResult: boolean = false;

  constructor() {
    super();
  }

  get productInfo(): string {
    return this._productInfo;
  }

  get productName(): string {
    return this._productName;
  }

  get productPrice(): string {
    return this._productPrice;
  }

  get hasResult(): boolean {
    return this._hasResult;
  }

  async onScanBarcode() {
    try {
      const hasPermission = await camera.requestPermissions();
      if (!hasPermission) {
        this.setProductInfo('Kamera izni gerekli');
        return;
      }

      const barcodescanner = new Barcode();
      const result = await barcodescanner.scan({
        formats: [Barcode.QR_CODE, Barcode.EAN_13, Barcode.EAN_8],
        message: 'Barkodu kamera çerçevesine yerleştirin',
        showFlipCameraButton: true,
        preferFrontCamera: false,
        showTorchButton: true,
        beepOnScan: true,
        torchOn: false
      });

      if (result.text) {
        this.searchProduct(result.text);
      }
    } catch (error) {
      this.setProductInfo('Barkod tarama başarısız: ' + error);
    }
  }

  private searchProduct(barcode: string) {
    const product = productData.products.find(p => p.barcode === barcode);
    
    if (product) {
      this._productName = product.name;
      this._productPrice = product.price;
      this._hasResult = true;
      this._productInfo = 'Ürün bulundu';
    } else {
      this._hasResult = false;
      this._productInfo = 'Ürün bulunamadı';
    }
    
    this.notifyPropertyChange('productName', this._productName);
    this.notifyPropertyChange('productPrice', this._productPrice);
    this.notifyPropertyChange('hasResult', this._hasResult);
    this.notifyPropertyChange('productInfo', this._productInfo);
  }

  private setProductInfo(message: string) {
    this._productInfo = message;
    this.notifyPropertyChange('productInfo', message);
  }
}