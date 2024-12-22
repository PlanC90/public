// Mevcut kodlara ek olarak yeni fonksiyon eklenecek

export const userService = {
    // Mevcut fonksiyonlar...

    async getAllUsers() {
        return await userRepository.getAll();
    }
};