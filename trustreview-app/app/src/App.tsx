import { Box, Container, Stack, ThemeProvider } from '@mui/material'
import './App.css'
import Search from './components/Search'
import { defaultTheme } from './theme/default'
import ProductTitle from './components/ProductTitle'
import ProductCardList from './components/ProductCardList'
import { products } from './shared/constants/products'
import ProductCard from './components/ProductCard'
import AppBar from './components/AppBar'

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
        <AppBar />
      <Stack spacing={4} sx={{ width: '100%', height: '100%', bgcolor: 'background.default', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Box width={300}>
          <ProductTitle />
          <Search value={''} onChange={() => { }} />
        </Box>
        <Container maxWidth="md">
          <ProductCardList productList={products} />
        </Container>
        <ProductCard />
      </Stack>
    </ThemeProvider>
  )
}

export default App
