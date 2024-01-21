let queue = [];

document.getElementById('enqueueBtn').addEventListener('click', () => {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;

    if (customerName && customerPhone) {
        if (queue.length < 10) {
            const customer = {
                name: customerName,
                phone: customerPhone
            };

            queue.push(customer);
            document.getElementById('customerName').value = ''; // Clear the input
            document.getElementById('customerPhone').value = ''; // Clear the input
            updateQueueDisplay();
        } else {
            alert('Queue is full. Please wait for your turn.');
        }
    } else {
        alert('Please enter both name and phone before joining the queue.');
    }
});


document.getElementById('dequeueBtn').addEventListener('click', () => {
    if (queue.length > 0) {
        const nextCustomer = queue.shift();
        alert('Next customer: ' + nextCustomer.name + ' (' + nextCustomer.phone + ')');
        updateQueueDisplay();
    } else {
        alert('No more customers in the queue.');
    }
});

function updateQueueDisplay() {
    const queueList = document.getElementById('queueList');
    const queueSizeSpan = document.getElementById('queueSize');

    // Clear the content
    queueList.innerHTML = '';

    queue.forEach((customer, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-2', 'p-3');

        card.innerHTML = `
            <p class="card-text">${index + 1}. ${customer.name} (${customer.phone})</p>
            <button class="btn btn-danger" onclick="deleteCustomer(${index})">Delete</button>
        `;

        queueList.appendChild(card);
    });

    // Update the queue size
    queueSizeSpan.innerText = queue.length;
}

function deleteCustomer(index) {
    queue.splice(index, 1);
    updateQueueDisplay();
}
