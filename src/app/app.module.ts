import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './user/login.component';
import { CustomerFormComponent } from './customer/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './user/guard/auth.guard';
import { RoleGuard } from './user/guard/role.guard';
import { TokenInterceptor } from './user/interceptor/token.interceptor';
import { AuthInterceptor } from './user/interceptor/auth.interceptor';
import { CompanyComponent } from './company/company.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceFormComponent } from './invoice/invoice-form.component';
import { InvoiceViewComponent } from './invoice/invoice-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderComponent } from './order/order.component';
import { OrderFormComponent } from './order/order-form.component';
import { OrderViewComponent } from './order/order-view.component';
import { InvoiceGenerateComponent } from './invoice/invoice-generate.component';
import { ExternalDataComponent } from './external-data/external-data.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ProviderComponent } from './provider/provider.component';
import { ProviderFormComponent } from './provider/provider-form.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product/product-form.component';
import { BuyOrderComponent } from './buy-order/buy-order.component';
import { BuyOrderFormComponent } from './buy-order/buy-order-form.component';
import { OrderInputComponent } from './order-input/order-input.component';
import { OrderInputFormComponent } from './order-input/order-input-form.component';
import { BuyOrderViewComponent } from './buy-order/buy-order-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer', pathMatch: 'full' },

  { path: 'customer', component: CustomerComponent},
  { path: 'customer/page/:page', component: CustomerComponent},
  { path: 'customer/form', component: CustomerFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'customer/form/:id', component: CustomerFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },

  { path: 'product', component: ProductComponent},
  { path: 'product/page/:page', component: ProductComponent},
  { path: 'product/form', component: ProductFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'product/form/:id', component: ProductFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },

  { path: 'provider', component: ProviderComponent},
  { path: 'provider/page/:page', component: ProviderComponent},
  { path: 'provider/form', component: ProviderFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'provider/form/:id', component: ProviderFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },

  { path: 'buy-order', component: BuyOrderComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'buy-order/page/:page', component: BuyOrderComponent},
  { path: 'buy-order/form', component: BuyOrderFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'buy-order/form/:id', component: BuyOrderFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'buy-order/view/:id', component: BuyOrderViewComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },


  { path: 'order-input', component: OrderInputComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'order-input/page/:page', component: OrderInputComponent},
  { path: 'order-input/form/:id', component: OrderInputFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },


  { path: 'order', component: OrderComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'order/page/:page', component: OrderComponent},
  { path: 'order/form', component: OrderFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'order/form/:id', component: OrderFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'order/view/:id', component: OrderViewComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },

  { path: 'invoice', component: InvoiceComponent},
  { path: 'invoice/view/:id', component: InvoiceViewComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'invoice/form', component: InvoiceFormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },
  { path: 'invoice/generate', component: InvoiceGenerateComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },

  { path: 'external-data', component: ExternalDataComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}  },

  { path: 'company', component: CompanyComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerComponent,
    LoginComponent,
    CustomerFormComponent,
    CompanyComponent,
    InvoiceComponent,
    InvoiceFormComponent,
    InvoiceViewComponent,
    OrderComponent,
    OrderFormComponent,
    OrderViewComponent,
    InvoiceGenerateComponent,
    ExternalDataComponent,
    PaginatorComponent,
    ProviderComponent,
    ProviderFormComponent,
    ProductComponent,
    ProductFormComponent,
    BuyOrderComponent,
    BuyOrderFormComponent,
    OrderInputComponent,
    OrderInputFormComponent,
    BuyOrderViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
            { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
