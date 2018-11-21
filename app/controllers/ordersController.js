var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Order = require("../models/order");
var path = require("path");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "../../index.html"));
});

/**
 * Loading data internally. Render html in backend
 */
router.get("/backendrender", function(req, res) {
  Order.find({}, function(err, orders) {
    if (err) return res.status(500).send("There was a problem finding orders.");
    res.render("index", {
      orders: orders.map(order => {
        return {
          Customer: order.Customer,
          Date: order.Date ? toDateOnlyGMT(order.Date) : ""
        };
      })
    });
  });
});

/***************/
/** REST APIs **/
/***************/

/***** Get all orders from database *****/
router.get("/orders", function(req, res) {
  Order.find({}, function(err, orders) {
    if (err) return res.status(500).send("There was a problem finding orders.");
    res.status(200).send(orders);
  });
});

/***** Get order by id *****/
router.get("/orders/:id", (req, res) => {
  Order.findById(req.params.id).then(doc => {
    res.json(doc);
  });
});

/***** Create an order *****/
router.post("/order", (req, res) => {
  var newOrder = new Order({
    customer: req.body.customer,
    value: req.body.value
  });
  newOrder.save().then(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
});

/***** Delete and order by id *****/
router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Order deleted successfully!");
  });
});

function toDateOnlyISO(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

function toDateOnlyGMT(date) {
  return date.toGMTString().substr(5, 11);
}

module.exports = router;
