import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProductsApi } from '../../services/api'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProductsApi()
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load products')
    }
  }
)

const initialManaged = [
  { id: 1, title: 'Notebook', price: 12 },
  { id: 2, title: 'Pen set', price: 8 },
]

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    listStatus: 'idle',
    listError: null,
    managedItems: initialManaged,
    nextManagedId: 3,
  },
  reducers: {
    addManagedItem(state, action) {
      const { title, price } = action.payload
      state.managedItems.push({
        id: state.nextManagedId,
        title,
        price: Number(price),
      })
      state.nextManagedId += 1
    },
    updateManagedItem(state, action) {
      const { id, title, price } = action.payload
      const idx = state.managedItems.findIndex((x) => x.id === id)
      if (idx !== -1) {
        state.managedItems[idx] = {
          ...state.managedItems[idx],
          title,
          price: Number(price),
        }
      }
    },
    deleteManagedItem(state, action) {
      state.managedItems = state.managedItems.filter(
        (x) => x.id !== action.payload
      )
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.listStatus = 'loading'
        state.listError = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.listStatus = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.listStatus = 'failed'
        state.listError = action.payload || 'Error'
      })
  },
})

export const { addManagedItem, updateManagedItem, deleteManagedItem } =
  productsSlice.actions
export default productsSlice.reducer
