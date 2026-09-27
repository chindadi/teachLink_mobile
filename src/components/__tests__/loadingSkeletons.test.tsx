import { render } from '@testing-library/react-native';

import { LoadingSkeleton } from '../loadingSkeletons';

describe('LoadingSkeleton', () => {
  it('renders the requested number of skeletons with the supplied dimensions', () => {
    const { toJSON } = render(<LoadingSkeleton height={24} width={180} count={3} />);

    const tree = toJSON();
    expect(tree).not.toBeNull();
    expect(tree?.children).toHaveLength(4);

    const skeletons = tree?.children?.slice(0, 3);
    expect(skeletons).toHaveLength(3);
    for (const skeleton of skeletons ?? []) {
      expect(typeof skeleton).not.toBe('string');
      if (typeof skeleton !== 'string') {
        expect(skeleton.props.style).toEqual(
          expect.objectContaining({ height: 24, width: 180, backgroundColor: '#f0f0f0' })
        );
      }
    }
  });

  it('renders one skeleton with defaults when no props are supplied', () => {
    const { toJSON } = render(<LoadingSkeleton />);

    const tree = toJSON();
    expect(tree?.children).toHaveLength(2);
    const skeleton = tree?.children?.[0];
    expect(skeleton).not.toBeNull();
    if (skeleton && typeof skeleton !== 'string') {
      expect(skeleton.props.style).toEqual(expect.objectContaining({ height: 100, width: '100%' }));
    }
  });
});
