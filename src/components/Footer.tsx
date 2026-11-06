const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-sm text-muted">
      <p>
        &copy; {year} Kumar Sahitya. Built with React and Tailwind CSS
      </p>
    </footer>
  );
}
