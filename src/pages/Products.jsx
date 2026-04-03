import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { fetchProducts } from '../redux/slices/productsSlice'

export default function Products() {
  const dispatch = useDispatch()
  const items = useSelector((s) => s.products.items)
  const listStatus = useSelector((s) => s.products.listStatus)
  const listError = useSelector((s) => s.products.listError)

  useEffect(() => {
    if (listStatus === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, listStatus])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      {listStatus === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {listStatus === 'failed' && listError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {listError}
        </Alert>
      )}
      {listStatus === 'succeeded' && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell align="right">Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell>{row.brand ?? '—'}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
