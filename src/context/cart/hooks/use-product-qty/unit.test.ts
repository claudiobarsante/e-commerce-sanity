import { renderHook, act } from '@testing-library/react-hooks';
import useProductQty from '.';

describe('useProductQty', () => {
  it('should increase product quantity', () => {
    const { result } = renderHook(() => useProductQty());

    act(() => {
      result.current.increaseQty();
    });

    expect(result.current.qty).toBe(2);
  });

  it('should decrease product quantity', () => {
    const { result } = renderHook(() => useProductQty());

    act(() => {
      result.current.increaseQty();
      result.current.decreaseQty();
    });

    expect(result.current.qty).toBe(1);

    act(() => {
      result.current.decreaseQty();
    });
    expect(result.current.qty).toBe(1);
  });
});
