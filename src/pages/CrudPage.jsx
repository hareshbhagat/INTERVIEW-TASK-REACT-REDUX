import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  addManagedItem,
  updateManagedItem,
  deleteManagedItem,
} from '../redux/slices/productsSlice'

export default function CrudPage() {
  const dispatch = useDispatch()
  const managedItems = useSelector((s) => s.products.managedItems)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [editingId, setEditingId] = useState(null)

  const resetForm = () => {
    setTitle('')
    setPrice('')
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const numPrice = price === '' ? 0 : Number(price)
    if (editingId != null) {
      dispatch(
        updateManagedItem({ id: editingId, title: title.trim(), price: numPrice })
      )
    } else {
      dispatch(addManagedItem({ title: title.trim(), price: numPrice }))
    }
    resetForm()
  }

  const startEdit = (row) => {
    setEditingId(row.id)
    setTitle(row.title)
    setPrice(String(row.price))
  }

  const handleDelete = (id) => {
    dispatch(deleteManagedItem(id))
    if (editingId === id) resetForm()
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Records
      </Typography>
      <Typography sx={{ mb: 2 }} color="text.secondary">
        Total records: {managedItems.length}
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          {editingId != null ? 'Edit record' : 'Add record'}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'flex-start' }}
        >
          <TextField
            label="Title"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Price"
            type="number"
            size="small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button type="submit" variant="contained" size="medium">
            {editingId != null ? 'Update' : 'Create'}
          </Button>
          {editingId != null && (
            <Button type="button" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managedItems.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => startEdit(row)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
