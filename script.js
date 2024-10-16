document.getElementById('addArticleBtn').addEventListener('click', function() {
    window.location.href = 'edit.html'; // מעביר לדף העריכה
});

if (document.getElementById('articleForm')) {
    document.getElementById('image').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgPreview = document.getElementById('previewImage');
                imgPreview.src = e.target.result;
                imgPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('articleForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const image = document.getElementById('previewImage').src;
        const content = document.getElementById('content').value;

        // יוצר כרטיס כתבה
        const articleHTML = `
            <article>
                <img src="${image}" alt="תמונה לכתבה">
                <h2>${title}</h2>
                <p>${content}</p>
            </article>
        `;

        // שומר ל-LocalStorage או מסד נתונים
        let articles = localStorage.getItem('articles') || '';
        articles += articleHTML;
        localStorage.setItem('articles', articles);

        // מעדכן את דף הבית
        window.location.href = 'index.html';
    });
}

// עדכון דף הבית עם הכתבות
if (document.getElementById('articlesContainer')) {
    const articles = localStorage.getItem('articles');
    if (articles) {
        document.getElementById('articlesContainer').innerHTML = articles;
    }
}
