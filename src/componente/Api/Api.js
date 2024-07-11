import React, { createContext, useContext, useState, useEffect } from 'react';

const handleSubmit = async (event) => {
  event.preventDefault();

  const userData = {
    username: 'exampleUser',
    password: 'examplePass'
  };

  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
