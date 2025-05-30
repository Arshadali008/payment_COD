# # -*- coding: utf-8 -*-
# from odoo import models, fields
#
#
# class PaymentProvider(models.Model):
#     _inherit = 'payment.provider'
#
#     code = fields.Selection(selection_add=[('cash_on_delivery', 'Cash on Delivery')],
#                             ondelete={'cash_on_delivery': 'set default'})
#     payment_provider_charges = fields.Monetary(
#         string="Provider Charges",
#         help="Additional charges for Cash On Delivery",
#         currency_field='main_currency_id',
#     )
# -*- coding: utf-8 -*-
from odoo import fields, models


class PaymentProvider(models.Model):
    _inherit = 'payment.provider'

    code = fields.Selection(selection_add=[('cash_on_delivery', 'Cash on Delivery')],
                            ondelete={'cash_on_delivery': 'set default'})
    payment_provider_charges = fields.Float(string='Transaction Fee', help='Fixed fee applied to transactions for this provider.')

    def _compute_payment_provider_charges(self, amount, currency, country):
        """Compute the custom fee for the transaction."""
        return self.payment_provider_charges if self.payment_provider_charges else 0.0
