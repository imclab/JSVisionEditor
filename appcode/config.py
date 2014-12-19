__author__ = 'aub3'
import os
# from boto.s3.connection import S3Connection
# from boto.s3.key import Key
# from boto.sqs.connection import SQSConnection
# from boto.sqs.message import Message

DEBUG = os.environ['SERVER_SOFTWARE'].startswith('Development')

TEMPLATES_PATH = "templates/"

# ACCESS =''
# SECRET = ''
# bucket_name = ''
# QUEUE_NAME = ''
# if ACCESS and SECRET and bucket_name:
#     conn = S3Connection(ACCESS,SECRET)
#     sqsconn = SQSConnection(ACCESS,SECRET)
#     bucket = conn.get_bucket(bucket_name,validate=False)
#
#
# def sign(path):
#     return conn.generate_url(
#         expires_in=long(600),
#         method='GET',
#         bucket=bucket_name,
#         key=path,
#         query_auth=True,
#         force_http=False
#     )
