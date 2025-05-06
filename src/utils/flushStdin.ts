export const flushStdin = () => {
    // Clear any unread data in stdin
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.resume()
    }
  };
  