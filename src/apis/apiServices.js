import axios from "axios";

const BASEURL = "https://ai-content-generator-backend-i244.onrender.com/api/v1";
export const signInUser = async (credentials) => {
  const response = await axios.post(`${BASEURL}/users/login`, credentials);

  if (response.data.success) {
    return response.data;
  } else {
    throw new Error(response.data.message || "Login failed");
  }
};
export const userLogout = async (token) => {
  const res = await axios.post(
    `${BASEURL}/users/logout`,
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const signUpUser = async (credentials) => {
  const response = await axios.post(`${BASEURL}/users/register`, credentials);

  if (response.data.success) {
    return response.data;
  } else {
    throw new Error(response.data.message || "Signup failed");
  }
};

export const saveGeneratedContent = async (data, token) => {
  const res = await axios.post(`${BASEURL}/users/create-ai-response`, data, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchUserData = async (token) => {
  try {
    const response = await axios.post(
      `${BASEURL}/users/profile`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const fetchAiResponseData = async (token) => {
  const response = await axios.get(`${BASEURL}/users/get-ai-response`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const aiResponses = response?.data?.data;

  // Calculate total words from aiResponses
  const totalWords = aiResponses?.reduce((acc, obj) => {
    if (obj.aiResponse) {
      return acc + obj.aiResponse.split(/\s+/).length;
    }
    return acc;
  }, 0);

  return { aiResponses, totalWords };
};

export const createSubscriptionApi = async (token) => {
  const response = await axios.post(
    `${BASEURL}/payment/create-subscription`,
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data?.data?.id;
};

export const savePaymentApi = async ({ token, paymentId }) => {
  console.log("inisde the save payment API");
  console.log(token);
  console.log(paymentId);

  const response = await axios.post(
    `${BASEURL}/payment/save-payment`,
    { paymentId },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
};
