# # -*- coding: utf-8 -*-
from odoo import models, fields, api


class PaymentTransaction(models.Model):
    _inherit = 'payment.transaction'

    def _create_transaction(self, amount, provider_id, **kwargs):
        provider = self.env['payment.provider'].browse(provider_id)
        currency = self.currency_id
        country = self.partner_id.country_id
        fee = provider._compute_payment_provider_charges(amount, currency, country)
        amount_with_fee = amount + fee
        return super()._create_transaction(amount=amount_with_fee, provider_id=provider_id, **kwargs)