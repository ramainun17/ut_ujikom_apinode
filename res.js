"use strict"; //membuat code js lebih ketat dan tetap saat dijalankan

exports.ok = function (data, res) {
  var value = {
    status: 200,
    data: data,
  };

  res.json(value);
  res.end();
};
