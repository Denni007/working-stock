import sum from 'lodash/sum';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';

// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Table,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fCurrency } from '../../utils/formatNumber';
// _mock_
import { _invoice } from '../../_mock';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { InvoiceToolbar } from '../../sections/@dashboard/e-commerce/invoice';
import { detailsOrder } from '../../actions/orderActions';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

export default function EcommerceInvoice(props) {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const { name = '',code= ''  } = useParams();
  const orderId = code;

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error:errorData } = orderDetails;
  const {orderItems,subTotal, total, activeStep, discount, billing} = orderDetails;   //  const subTotal = sum(_invoice.items.map((item) => item.price * item.qty));
  const dispatch = useDispatch();
console.log(code);
 // const total = subTotal - _invoice.discount + _invoice.taxes;
 useEffect(() => {
  if (isMountedRef.current) {
    dispatch(detailsOrder(orderId));
  }
}, [dispatch, isMountedRef]);

  
  return (
    <Page title="Ecommerce: Invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Invoice' },
          ]}
        />

        {!loading?<InvoiceToolbar invoice={order} />:<>hello</>}

        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Image disabledEffect visibleByDefault alt="logo" src="/logo/logo_full.svg" sx={{ maxWidth: 120 }} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Label color={order?.isPaid?"success":"error"} sx={{ textTransform: 'uppercase', mb: 1 }}>
                  {order?.isPaid?'Paid':'Not Paid' }
                </Label>
                <Typography variant="h6">{order?._id}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice to
              </Typography>
              <Typography variant="body2">{order?.shipping.receiver}</Typography>
              <Typography variant="body2">{order?.shipping.fullAddress}</Typography>
              <Typography variant="body2">Phone: {order?.shipping.phone}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice to
              </Typography>
              <Typography variant="body2">{_invoice.invoiceTo.name}</Typography>
              <Typography variant="body2">{_invoice.invoiceTo.address}</Typography>
              <Typography variant="body2">Phone: {_invoice.invoiceTo.phone}</Typography>
            </Grid>
          </Grid>
             
          <Scrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' },
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Qty</TableCell>
                    <TableCell align="right">Unit price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order?.orderItems.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">{row.name}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {row.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="right">{fCurrency(row.price)}</TableCell>
                      <TableCell align="right">{fCurrency(row.price * row.quantity)}</TableCell>
                    </TableRow>
                  ))}

                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Box sx={{ mt: 2 }} />
                      <Typography>Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Box sx={{ mt: 2 }} />
                      <Typography>{fCurrency(order?.subtotal)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography>Discount</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Typography sx={{ color: 'error.main' }}>{fCurrency(order?.discount)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography>Taxes</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Typography>{fCurrency(_invoice.taxes)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="right" width={140}>
                      <Typography variant="h6">{fCurrency(order?.total)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider sx={{ mt: 5 }} />

          <Grid container>
            <Grid item xs={12} md={9} sx={{ py: 3 }}>
              <Typography variant="subtitle2">NOTES</Typography>
              <Typography variant="body2">
                We appreciate your business. Should you need us to add VAT or extra notes let us know!
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
              <Typography variant="subtitle2">Have a Question?</Typography>
              <Typography variant="body2">support@minimals.cc</Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
