import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';

const GH_TOKEN = require('../../../../tokens.js');

const productUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/61575';
const styleUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/61575/styles';
const ratingUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/reviews/meta?product_id=61575';

export default function Overview() {
  const [item, setItem] = useState({});
  const [style, setStyle] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});
  const [rating, setRating] = useState({});

  function getItem() {
    axios.get(productUrl, { headers: { Authorization: GH_TOKEN } })
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getStyle() {
    axios.get(styleUrl, { headers: { Authorization: GH_TOKEN } })
      .then((res) => {
        setStyle(res.data.results);
        setCurrentStyle(res.data.results[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getRating() {
    axios.get(ratingUrl, { headers: { Authorization: GH_TOKEN } })
      .then((res) => {
        setStyle(res.data.results);
        setRating(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getItem();
    getStyle();
    getRating();
  }, []);

  return (
    <div>
      <ProductInfo item={item} style={currentStyle} rating={rating} data-testid="product-info" />
    </div>
  );
}