export const sendImages = (dataSet) => {
    const data = { images: dataSet };
    fetch('http://127.0.0.1:5000/process-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle response data from server here
            // console.log(data);
            alert(data.status)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export const deleteImages = (id) => {
    const data = { id: id };
    fetch('http://127.0.0.1:5000/remove-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle response data from server here
            // console.log(data);
            alert(data.status)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

