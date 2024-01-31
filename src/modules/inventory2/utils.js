import React from "react";
import moment from 'moment'
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(str){
  return moment(str).format('MMM-DD-YYYY')
}