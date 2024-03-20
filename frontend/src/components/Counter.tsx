'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { decrement, increment } from '@/lib/store/counterSlice';

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
