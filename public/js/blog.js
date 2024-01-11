const commentHandler = async (event) => {
    event.preventDefault();
    const url = location.href;
    const urlArray = url.split('/')
    const blog_id = urlArray[urlArray.length - 1];

    const comment = document.querySelector('#comment').value.trim();

    if (comment) {
        const response = await fetch(`/api/blogs/comment/`, {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert('Failed to post comment');
        }
    }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentHandler);