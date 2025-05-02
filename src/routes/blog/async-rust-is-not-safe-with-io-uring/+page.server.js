export const load = () => {
    return {
        title: 'Async Rust is not safe with io_uring',
        description: 'An exploration of how io_uring-based async runtimes in Rust have safety issues that can lead to TCP connection leaks.',
        date: '2024-10-30',
        authors: ['Tzu Gwo'],
        tags: ['rust', 'async', 'io', 'safety', 'io_uring', 'monoio', 'glommio', 'compio', 'cancellation'],
        slug: 'async-rust-is-not-safe-with-io-uring'
    };
};
