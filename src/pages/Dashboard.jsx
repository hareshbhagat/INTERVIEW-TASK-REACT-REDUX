import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function Dashboard() {
  const user = useSelector((s) => s.auth.user)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {user?.firstName
          ? `Hello, ${user.firstName}`
          : 'You are signed in.'}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button variant="outlined" component={Link} to="/products">
          View products
        </Button>
        <Button variant="outlined" component={Link} to="/crud">
          Manage records
        </Button>
      </Box>
    </Box>
  )
}
