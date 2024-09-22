document.addEventListener('DOMContentLoaded', function () {
    const photos = document.querySelectorAll('.photo');
    const selectedPhotoText = document.getElementById('selected-photo');
    let selectedPhotoId = null;

    photos.forEach(photo => {
        // 写真をクリックして選択
        photo.addEventListener('click', function () {
            photos.forEach(p => p.classList.remove('selected'));
            photo.classList.add('selected');
            selectedPhotoId = photo.getAttribute('data-id');
            selectedPhotoText.textContent = selectedPhotoId;
        });

        // 拡大アイコンをクリックしてポップアップを表示
        const zoomIcon = photo.querySelector('.zoom-icon');
        zoomIcon.addEventListener('click', function (event) {
            event.stopPropagation();  // 写真の選択イベントを防ぐ
            showPopup(photo);
        });
    });

    document.getElementById('submit-btn').addEventListener('click', function () {
        if (selectedPhotoId) {
            // ローディングアニメーションを表示
            showLoading();

            // 1秒後に結果を表示
            setTimeout(function () {
                showResultMessage();
            }, 1000);
        } else {
            alert('写真を選択してください。');
        }
    });

    // ポップアップを表示する関数
    function showPopup(photo) {
        const popup = document.getElementById('popup');
        const popupPhoto = document.querySelector('.popup-photo');

        // 拡大表示するためのスタイルをポップアップに反映
        const photoClone = photo.cloneNode(true);
        photoClone.classList.remove('selected');
        popupPhoto.innerHTML = '';
        popupPhoto.appendChild(photoClone);

        popup.style.display = 'flex';
    }

    // ポップアップを閉じる
    document.getElementById('close-popup').addEventListener('click', function () {
        const popup = document.getElementById('popup');
        popup.style.display = 'none';
    });

    // ポップアップの背景をクリックして閉じる
    document.getElementById('popup').addEventListener('click', function (event) {
        if (event.target === this) {
            this.style.display = 'none';
        }
    });

    // ローディングアニメーションを表示
    function showLoading() {
        const resultModal = document.getElementById('result-modal');
        const loadingSpinner = document.getElementById('loading-spinner');
        const resultMessage = document.getElementById('result-message');

        resultModal.style.display = 'flex';
        loadingSpinner.style.display = 'block';
        resultMessage.style.display = 'none';
    }

    // 結果メッセージを表示
    function showResultMessage() {
        const loadingSpinner = document.getElementById('loading-spinner');
        const resultMessage = document.getElementById('result-message');

        // ローディングを非表示にし、結果メッセージを表示
        loadingSpinner.style.display = 'none';
        resultMessage.style.display = 'block';

        // 1秒後にモーダルを自動的に閉じる
        setTimeout(function () {
            document.getElementById('result-modal').style.display = 'none';
        }, 1000);
    }
});