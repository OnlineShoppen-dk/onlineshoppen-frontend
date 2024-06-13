function Logo() {
  return (
    <div>
      <img src="/logo.jpg" alt="logo" />
    </div>
  );
}

export default Logo;

/* OLD LOGO COMPONENT
// Product Logo
function ProductLogo(product: Product) {
    const src = product.images[0]?.fileName ?? "https://via.placeholder.com/50";
    const alt = product.images[0]?.alt ?? product.name;
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Image borderRadius="full" boxSize="50px" src={src} alt={alt} />
        </Box>
    );
}

*/