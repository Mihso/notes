import React, { useRef, useState } from "react";
import { trpc } from "../trpc"

export function MyComponent() {
    // input is optional, so we don't have to pass second argument
    const helloNoArgs = trpc.hello.useQuery();
    const helloWithArgs = trpc.hello.useQuery({ text: 'this is an input' });
    return (
      <div>
        <h1>Hello World Example</h1>
        <ul>
          <li>
            helloNoArgs ({helloNoArgs.status}):{' '}
            <pre>{JSON.stringify(helloNoArgs.data, null, 2)}</pre>
          </li>
          <li>
            helloWithArgs ({helloWithArgs.status}):{' '}
            <pre>{JSON.stringify(helloWithArgs.data, null, 2)}</pre>
          </li>
        </ul>
      </div>
    );
  }