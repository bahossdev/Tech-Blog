const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new blog post');
    }
  }
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('update')) {
    const id = event.target.getAttribute('update');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('delete')) {
    const id = event.target.getAttribute('delete');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

  document
  .querySelector('.blog-list')
  .addEventListener('click', updateButtonHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);
