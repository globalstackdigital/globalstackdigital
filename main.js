/**
 * main.js — Global Stack Digital
 * Shared behaviour for every page: colour theme toggle, mobile drawer nav,
 * icon sprite injection, and the contact form (home page only).
 * Loaded with [defer] at the end of <body> so it never blocks rendering —
 * a tiny inline snippet in <head> applies a saved dark-mode choice before
 * first paint; this file just wires up the interactive bits afterwards.
 */
(function () {
  "use strict";

  /* ---- icon + brand-logo sprite (kept here so pages stay markup-light) ---- */
  var SPRITE = "<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<symbol id=\"i-megaphone\" viewBox=\"0 0 24 24\"><path d=\"M11 5 6 9H2v6h4l5 4V5Z\"/><path d=\"M15.5 8.5a5 5 0 0 1 0 7\"/><path d=\"M18.8 5.2a9 9 0 0 1 0 13.6\"/></symbol>\n<symbol id=\"i-shield-check\" viewBox=\"0 0 24 24\"><path d=\"M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z\"/><path d=\"m9 12 2 2 4-4\"/></symbol>\n<symbol id=\"i-trending-up\" viewBox=\"0 0 24 24\"><path d=\"M3 17 10 10l4 4 7-7\"/><path d=\"M15 7h6v6\"/></symbol>\n<symbol id=\"i-search\" viewBox=\"0 0 24 24\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m21 21-4.3-4.3\"/></symbol>\n<symbol id=\"i-credit-card\" viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M2 10h20\"/></symbol>\n<symbol id=\"i-target\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1.4\"/></symbol>\n<symbol id=\"i-pen\" viewBox=\"0 0 24 24\"><path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.1 2.1 0 0 1 3 3L7.5 18.5 3 20l1.5-4.5Z\"/></symbol>\n<symbol id=\"i-message\" viewBox=\"0 0 24 24\"><path d=\"M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z\"/></symbol>\n<symbol id=\"i-bar-chart\" viewBox=\"0 0 24 24\"><path d=\"M3 3v18h18\"/><rect x=\"7\" y=\"11\" width=\"3\" height=\"7\"/><rect x=\"12\" y=\"7\" width=\"3\" height=\"11\"/><rect x=\"17\" y=\"4\" width=\"3\" height=\"14\"/></symbol>\n<symbol id=\"i-zap\" viewBox=\"0 0 24 24\"><path d=\"M13 2 3 14h9l-1 8 10-12h-9l1-8Z\"/></symbol>\n<symbol id=\"i-layout\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/></symbol>\n<symbol id=\"i-monitor\" viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M8 21h8M12 17v4\"/></symbol>\n<symbol id=\"i-clipboard\" viewBox=\"0 0 24 24\"><rect x=\"8\" y=\"2\" width=\"8\" height=\"4\" rx=\"1\"/><path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"/><path d=\"M9 12h6M9 16h4\"/></symbol>\n<symbol id=\"i-filter\" viewBox=\"0 0 24 24\"><path d=\"M3 4h18l-7 8v7l-4 2v-9L3 4Z\"/></symbol>\n<symbol id=\"i-repeat\" viewBox=\"0 0 24 24\"><path d=\"m17 2 4 4-4 4\"/><path d=\"M3 11V9a4 4 0 0 1 4-4h14\"/><path d=\"m7 22-4-4 4-4\"/><path d=\"M21 13v2a4 4 0 0 1-4 4H3\"/></symbol>\n<symbol id=\"i-beaker\" viewBox=\"0 0 24 24\"><path d=\"M9 3h6M10 3v5.5L4.8 17.6A2 2 0 0 0 6.5 20.7h11a2 2 0 0 0 1.7-3.1L14 8.5V3\"/><path d=\"M7.5 14h9\"/></symbol>\n<symbol id=\"i-gem\" viewBox=\"0 0 24 24\"><path d=\"M6 3h12l4 6-10 12L2 9Z\"/><path d=\"M2 9h20M8.5 3 6 9l6 12 6-12-2.5-6\"/></symbol>\n<symbol id=\"i-layers\" viewBox=\"0 0 24 24\"><path d=\"m12 2 9 5-9 5-9-5 9-5Z\"/><path d=\"m3 12 9 5 9-5M3 17l9 5 9-5\"/></symbol>\n<symbol id=\"i-mail\" viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m3 7 9 6 9-6\"/></symbol>\n<symbol id=\"i-map-pin\" viewBox=\"0 0 24 24\"><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></symbol>\n<symbol id=\"i-clock\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3.5 2\"/></symbol>\n<symbol id=\"b-googleads\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998zm19.4643-6.0004L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644zM7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z\"/></symbol><symbol id=\"b-meta\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z\"/></symbol><symbol id=\"b-cypress\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M11.998.0195c-.8642 0-1.6816.1101-2.1445.1934v.002C4.1731 1.2283 0 6.1368 0 12.0018c0 1.1265.1573 2.2328.4648 3.3028.0387.1453.0915.2993.1368.4473 1.607 4.865 6.2245 8.226 11.3925 8.2285.0651 0 .2518-.0003.502-.0118.8564-.0353 1.6228-.5734 1.9512-1.369l.4736-1.1544L20.4258 8.043H18.621l-2.3164 5.871-2.334-5.871h-1.9082l3.2734 8.0117c-.8115 1.9702-1.6252 3.9395-2.4355 5.9101-.0808.1945-.2655.3284-.4727.336-.144.005-.285.0098-.4316.0098-4.5848 0-8.6672-3.0695-9.9277-7.4649a10.3058 10.3058 0 0 1-.3985-2.8437c0-5.0887 3.6521-9.3404 8.6035-10.164.2214-.037.8885-.1446 1.7246-.1446 4.4166 0 8.269 2.732 9.7305 6.8476.0558.144.0977.293.1465.4395.299.9746.4531 1.9887.4531 3.0215 0 4.5696-2.9413 8.5326-7.3164 9.8613l.4863 1.5996c5.085-1.546 8.4995-6.1518 8.502-11.459 0-1.5491-.2983-2.8706-.6504-3.8926-.0432-.1212-.0873-.2422-.1309-.3633h-.002C21.4577 3.0954 17.0444.0195 11.998.0195ZM8.4336 7.8906c-1.1999 0-2.1747.3852-2.9805 1.1758-.8007.7856-1.205 1.7736-1.205 2.9356 0 1.1544.4068 2.1368 1.205 2.9199.8058.7906 1.7806 1.1738 2.9805 1.1738 1.705 0 3.1556-.955 3.7871-2.4883l.0332-.082-1.6289-.5547c-.168.4563-.7552 1.4883-2.1914 1.4883-.6745 0-1.2437-.2344-1.6934-.6992-.4572-.4699-.6875-1.0632-.6875-1.7578 0-.6998.2253-1.2809.6875-1.7735.4522-.4648 1.019-.7012 1.6934-.7012 1.438 0 2.0238 1.0815 2.1934 1.4883l1.627-.5527-.0333-.084c-.629-1.5358-2.082-2.4883-3.7871-2.4883Z\"/></symbol><symbol id=\"b-postman\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z\"/></symbol><symbol id=\"b-jira\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z\"/></symbol><symbol id=\"b-mixpanel\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M6.967 9.996h3.053c-.763-.477-1.048-1.145-1.431-2.384L7.443 3.366C6.919 1.458 6.49.551 4.39.551H.004v1.145h.621c1.286 0 1.431.477 1.814 1.908L3.44 7.326c.524 1.814 1.337 2.67 3.53 2.67h-.003Zm7.06 0h3.053c2.194 0 2.956-.86 3.484-2.67l1.001-3.722c.382-1.431.57-1.908 1.814-1.908H24V.551h-4.34c-2.146 0-2.576.86-3.053 2.815l-1.145 4.246c-.384 1.286-.673 1.907-1.435 2.384Zm-4.007 4.008h4.007V9.996H10.02v4.008ZM0 23.449h4.39c2.1 0 2.529-.907 3.053-2.815l1.146-4.246c.383-1.239.668-1.907 1.431-2.384H6.967c-2.194 0-3.007.86-3.531 2.67l-1.001 3.722c-.383 1.431-.524 1.907-1.814 1.907H0v1.146Zm19.65 0h4.343v-1.146h-.622c-1.239 0-1.431-.476-1.814-1.907l-1.001-3.722c-.524-1.814-1.286-2.67-3.483-2.67h-3.046c.762.477 1.041 1.098 1.424 2.384l1.145 4.246c.477 1.955.907 2.815 3.054 2.815Z\"/></symbol><symbol id=\"b-hubspot\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z\"/></symbol><symbol id=\"b-github\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12\"/></symbol><symbol id=\"b-googleanalytics\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z\"/></symbol><symbol id=\"b-openai\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z\"/></symbol><symbol id=\"b-claude\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z\"/></symbol><symbol id=\"b-playwright\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"currentColor\"/><ellipse cx=\"9\" cy=\"10\" rx=\"1.5\" ry=\"2\" fill=\"var(--card)\"/><ellipse cx=\"15.2\" cy=\"10\" rx=\"1.5\" ry=\"2\" fill=\"var(--card)\"/><path d=\"M6.5 15c2.2 2.2 8.8 2.2 11 0\" stroke=\"var(--card)\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/></symbol><symbol id=\"b-cursor\" viewBox=\"0 0 24 24\"><path d=\"M5 3 19.5 11 12.6 12.9 10 20 Z\" fill=\"currentColor\"/></symbol><symbol id=\"b-windsurf\" viewBox=\"0 0 24 24\"><path d=\"M7 20 18 4v16Z\" fill=\"currentColor\"/><path d=\"M4.5 20h15\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\"/></symbol></svg>";

  function injectSprite() {
    if (document.getElementById("gsd-sprite")) return;
    var holder = document.createElement("div");
    holder.innerHTML = SPRITE;
    var svg = holder.firstElementChild;
    if (!svg) return;
    svg.id = "gsd-sprite";
    document.body.insertBefore(svg, document.body.firstChild);
  }

  function initTheme() {
    var tb = document.getElementById("themebtn");
    if (!tb) return;
    function apply(mode) {
      if (mode === "dark") document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
      tb.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
    apply(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    tb.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem("gsd-theme", next); } catch (e) {}
    });
  }

  function initDrawer() {
    var burger = document.getElementById("burger"), drawer = document.getElementById("drawer");
    if (!burger || !drawer) return;
    function set(open) {
      drawer.classList.toggle("open", open);
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.setAttribute("aria-controls", "drawer");
    burger.addEventListener("click", function () { set(!drawer.classList.contains("open")); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) { set(false); burger.focus(); }
    });
  }

  /* ---- contact form: Web3Forms submit + local draft autosave ---- */
  function initForm() {
    var form = document.getElementById("leadForm");
    if (!form) return;
    var tag = document.getElementById("savedTag"), note = form.querySelector(".fnote");
    if (note) note.setAttribute("aria-live", "polite"); /* status messages only ever touch .fnote, never .form-consent */
    var fields = ["n", "co", "e", "ph", "sv", "bd", "ms"], KEY = "gsd-lead-draft", t;

    try {
      var d = JSON.parse(localStorage.getItem(KEY) || "{}");
      fields.forEach(function (id) { if (d[id] != null) form.querySelector("#" + id).value = d[id]; });
      if (Object.keys(d).length) tag.hidden = false;
    } catch (e) {}

    function save() {
      var d = {};
      fields.forEach(function (id) { var v = form.querySelector("#" + id).value; if (v) d[id] = v; });
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
      tag.hidden = false; tag.textContent = "\u2713 Draft saved";
    }
    form.addEventListener("input", function () {
      tag.hidden = false; tag.textContent = "Saving\u2026";
      clearTimeout(t); t = setTimeout(save, 600);
    });

    window.submitLead = async function (ev) {
      ev.preventDefault();
      var val = function (id) { return (form.querySelector("#" + id).value || "").trim(); };
      var name = val("n"), email = val("e"), service = form.querySelector("#sv").value, msg = val("ms");
      var btn = form.querySelector("button[type=submit]");
      if (!name || !email || !service || !msg) {
        note.classList.add("is-err");
        note.textContent = "Please add your name, email, service and project details.";
        return;
      }
      note.classList.remove("is-err"); var label = btn.textContent;
      btn.disabled = true; btn.textContent = "Sending\u2026";

      var fd = new FormData();
      fd.append("access_key", "ffdcc896-2b4e-4f20-88bd-b9cc22549412");
      fd.append("subject", "New Lead: " + name + " \u2014 " + service);
      fd.append("from_name", "Global Stack Digital Website");
      fd.append("name", name); fd.append("email", email);
      fd.append("company", val("co") || "N/A"); fd.append("phone", val("ph") || "N/A");
      fd.append("service", service); fd.append("budget", form.querySelector("#bd").value || "Not specified");
      fd.append("message", msg); fd.append("botcheck", "");

      try {
        var r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
        var data = await r.json();
        if (r.ok && data.success) {
          form.reset(); clearTimeout(t); /* a pending autosave must not re-create the draft */
          try { localStorage.removeItem(KEY); } catch (e) {}
          tag.hidden = true; note.classList.remove("is-err");
          note.textContent = "Message sent. We'll reply within 24 hours.";
          /* analytics is optional: only fires if the visitor accepted it (see consent.js) */
          try { if (window.mixpanel && typeof window.mixpanel.track === "function") window.mixpanel.track("Lead Submitted", { service: service }); } catch (e) {}
        } else {
          throw new Error(data.message || "failed");
        }
      } catch (err) {
        note.classList.add("is-err");
        note.textContent = "Could not send right now. Please email globalstackdigital@gmail.com directly.";
      } finally {
        btn.disabled = false; btn.textContent = label;
      }
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectSprite();
    initTheme();
    initDrawer();
    initForm();
  });
})();
