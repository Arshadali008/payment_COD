# # -*- coding: utf-8 -*-
from odoo import models, fields, api
#
#
# class SaleOrder(models.Model):
#     _inherit = 'sale.order'
#
#     cod_charges = fields.Monetary(string='COD Charges', currency_field='currency_id', default=0.0)
#
#     @api.depends('order_line.price_total', 'cod_charges')
#     def _compute_amounts(self):
#         super()._compute_amounts()
#         for order in self:
#             order.amount_total += order.cod_charges
#             print(order.cod_charges)
#
#     def set_cod_charges(self, provider_id):
#         if not provider_id:
#             self.cod_charges = 0.0
#             return
#         provider = self.env['payment.provider'].browse(provider_id)
#         if provider.code == 'cash_on_delivery':
#             self.cod_charges = provider.payment_provider_charges or 0.0
#         else:
#             self.cod_charges = 0.0
# -*- coding: utf-8 -*-
from odoo import models, fields, api


class SaleOrder(models.Model):
    _inherit = 'sale.order'

    cod_charges = fields.Monetary(string='COD Charges', currency_field='currency_id', default=0.0)

    @api.depends('order_line.price_total', 'cod_charges')
    def _compute_amounts(self):
        super()._compute_amounts()
        for order in self:
            order.amount_total += order.cod_charges
            print(order.read())
    def set_cod_charges(self, provider_id):
        cod_charges = 0.0
        if not provider_id:
            self.write({'cod_charges': cod_charges})
            return
        provider = self.env['payment.provider'].browse(provider_id)
        cod_charges = provider.payment_provider_charges if provider.code == 'cash_on_delivery' else 0.0
        self.write({'cod_charges': cod_charges})
# # -*- coding: utf-8 -*-
# class SaleOrder(models.Model):
#     _inherit = 'sale.order'
#
#     cod_charges = fields.Monetary(string='COD Charges', currency_field='currency_id', default=0.0)
#     def _create_payment_transaction(self, vals):
#         provider = self.env['payment.provider'].browse(vals.get('provider_id'))
#         if provider and provider.payment_provider_charges:
#             fee = provider._compute_payment_provider_charges(self.amount_total, self.currency_id, self.partner_id.country_id)
#             self.env['sale.order.line'].create({
#                 'order_id': self.id,
#                 'name': f'Payment Fee ({provider.name})',
#                 'price_unit': fee,
#                 'product_id': self.env.ref('custom_payment_fee.product_payment_fee').id,
#                 'product_uom_qty': 1,
#             })
#         return super()._create_payment_transaction(vals)