# -*- coding: utf-8 -*-
{
    'name': "Payment Provider: Cash on Delivery",
    'version': '1.0',
    'category': 'Accounting/Payment Providers',
    'sequence': 350,
    'summary': "A payment provider for cash on delivery throughout India.",
    'description': " ",  # Non-empty string to avoid loading the README file.
    'depends': ['base', 'payment', 'account', 'website', 'website_sale'],
    'data': [
        'data/cash_on_delivery_data.xml',
        'views/payment_provider_views.xml',
        # 'views/payment_method_views.xml',
        'views/website_total_form.xml',
        # 'views/sale_order_views.xml',
        # 'static/src/views/templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'payment_cash_on_delivery/static/src/js/cash_on_delivery.js',
            'payment_cash_on_delivery/static/src/js/pay_now.js',
            # 'payment_cash_on_delivery/static/src/js/cash_on_delivery_component.js',
        ],
        'web.assets_qweb': [
            'payment_cash_on_delivery/static/src/views/templates.xml',
        ],
    },
    'license': 'LGPL-3',
    'auto_install': False,
    'installable': True,
}
