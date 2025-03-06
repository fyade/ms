import { Request } from 'express';
import { UAParser } from "ua-parser-js";

/**
 * 从请求中读取ip信息
 * @param request
 */
export function getIpInfoFromRequest(request: Request) {
  const loginIp: string = request.headers['x-real-ip'] || request.headers['x-forwarded-for'] || (request as any).ip;
  const proto_ = request.headers['x-forwarded-proto'] || request.protocol || 'http';
  const proto = Array.isArray(proto_) ? proto_.toString() : proto_;
  const hostname = request.hostname;
  const port_ = request.headers['x-forwarded-port'] || '80';
  const port = Array.isArray(proto_) ? proto_.toString() : proto_;
  const userAgentString = request.headers['user-agent'];
  const ua = UAParser(userAgentString)
  const browser = ua.browser;
  const os = ua.os;
  const loginBrowser = `${browser.name} ${browser.version}`;
  const loginOs = `${os.name} ${os.version}`;
  return {
    ip: loginIp,
    host: hostname,
    browser: loginBrowser,
    os: loginOs,
    proto: proto,
  };
}

/**
 * 从oauth中获取tokenUuid
 * @param oauth
 */
export function getTokenUuidFromAuth(oauth: string) {
  return typeof oauth === 'string' ? (oauth.startsWith('Bearer') ? oauth.substring(6) : oauth).trim() : '';
}
