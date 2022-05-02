import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";

const RedirectNaver = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const getNaverData = () => {
    if (!location.hash) return;
    const token = location.hash.split("=")[1].split("&")[0]; // token
    const state = location.hash.split("=")[2].split("&")[0]; // state

    dispatch(userActions.naverLogin(token, state));
  };

  useEffect(() => {
    getNaverData();
  }, []);

  return null;
};

export default RedirectNaver;
