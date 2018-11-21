console.log("connected");
function getCustomer(orders) {
  let customer = document.querySelector(".customer").value;
  let val = document.querySelector(".value").value;

  console.log(customer, val);
}

function loadCustomerOrders(orders) {
  const container = document.querySelector("#orders-table");
  const containerBody = container.querySelector("tbody");

  const html = orders
    .map(order => {
      const date = order.Date ? order.Date.substr(0, 10) : "";
      return `<tr>
        <th scope="row">${order._id}</th>
        <td>${order.Customer}</td>
        <td>${date}</td>
        <td>${order.IsDelivered}</td>
        <td>${order.Value}</td>
      </tr>`;
    })
    .join("\n");
  containerBody.innerHTML = html;
}

$(() => {
  $.get("http://localhost:3000/orders").then(orders => {
    loadCustomerOrders(
      orders.sort((orderA, orderB) => {
        const dateA = orderA.Date;
        const dateB = orderB.Date;
        if (dateA < dateB) {
          return 1;
        }
        if (dateA > dateB) {
          return -1;
        }
        return 0;
      })
    );
  });
});
