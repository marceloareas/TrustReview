import { Box, Stack, ThemeProvider } from '@mui/material'
import './App.css'
import Search from './components/Search'
import { defaultTheme } from './theme/default'
import ProductCard from './components/ProductCard'
import img_test from './assets/img_test.jpg'
import ProductTitle from './components/ProductTitle'

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Stack spacing={4} sx={{ width: '100vw', height: '100vh', bgcolor: 'background.default', alignItems: 'center', justifyContent: 'center' }}>
        <Box width={300}>
          <ProductTitle />
          <Search value={''} onChange={() => { }} />
        </Box>
        <ProductCard productData={{ productId: '1', imageUrl: img_test }} />
        <ProductCard />
      </Stack>
    </ThemeProvider>
  )
}

export default App
