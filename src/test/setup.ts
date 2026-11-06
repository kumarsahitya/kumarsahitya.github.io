import '@testing-library/jest-dom/vitest'

// jsdom has no IntersectionObserver; motion's whileInView needs one.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
