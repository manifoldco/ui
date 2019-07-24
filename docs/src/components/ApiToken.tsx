import React, { FormEvent, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr auto;
  padding: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.black10};
  border-radius: ${({ theme }) => theme.radius.default};
  outline: none;
  transition: border-color 150ms linear;
  appearance: none;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.color.blue};
  }
`;

const Submit = styled.input.attrs({ type: 'submit' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 2.5rem;
  padding: 0 1.5rem;
  color: var(--manifold-grayscale-95i);
  font-size: var(--manifold-font-d1);
  font-family: var(--theme-font-family, var(--manifold-font-family));
  line-height: 2.5;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
  background: var(--manifold-grayscale-100);
  border: transparent;
  border-radius: var(--manifold-radius);
  outline: none;
  box-shadow: var(--manifold-shadow-default);
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 150ms;
  transition-property: background-color, border-color, color, box-shadow, filter;

  &:focus,
  &:hover {
    background: var(--manifold-grayscale-90);
    filter: saturate(130%);
  }

  &:active {
    color: var(--manifold-grayscale-90i);
    transform: translateY(1px);
    filter: brightness(90%);
  }
`;

const ApiToken = () => {
  const [token, setToken] = useState(localStorage.getItem('manifold_api_token') || '');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);

    localStorage.setItem('manifold_api_token', token);
    window.location.reload();
  };

  return (
    <Form method="POST" onSubmit={submit}>
      <Input
        name="token"
        type="text"
        value={token}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
        placeholder="Manifold API Token"
      />
      <Submit value="Set Token" />
    </Form>
  );
};

export default ApiToken;
