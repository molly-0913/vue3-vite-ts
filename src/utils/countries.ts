export type CountryType = {
  countryCode2: string
  countryCode3: string
  countryName: string
  mapDisplay: string
}

export const getCountryName = (countryCode: string) => {
  const findCountryObj = countries.find((item) => item.countryCode2 === countryCode)
  return findCountryObj?.mapDisplay
}

export const countries: CountryType[] = [
  {
    countryName: '阿尔及利亚',
    mapDisplay: 'Algeria',
    countryCode3: 'DZA',
    countryCode2: 'DZ'
  },
  {
    countryName: '安哥拉',
    mapDisplay: 'Angola',
    countryCode3: 'AGO',
    countryCode2: 'AO'
  },
  {
    countryName: '阿根廷',
    mapDisplay: 'Argentina',
    countryCode3: 'ARG',
    countryCode2: 'AR'
  },
  {
    countryName: '亚美尼亚',
    mapDisplay: 'Armenia',
    countryCode3: 'ARM',
    countryCode2: 'AM'
  },
  {
    countryName: '澳大利亚',
    mapDisplay: 'Australia',
    countryCode3: 'AUS',
    countryCode2: 'AU'
  },
  {
    countryName: '奥地利',
    mapDisplay: 'Austria',
    countryCode3: 'AUT',
    countryCode2: 'AT'
  },
  {
    countryName: '阿塞拜疆',
    mapDisplay: 'Azerbaijan',
    countryCode3: 'AZE',
    countryCode2: 'AZ'
  },
  {
    countryName: '孟加拉国',
    mapDisplay: 'Bangladesh',
    countryCode3: 'BGD',
    countryCode2: 'BD'
  },
  {
    countryName: '比利时',
    mapDisplay: 'Belgium',
    countryCode3: 'BEL',
    countryCode2: 'BE'
  },
  {
    countryName: '贝宁',
    mapDisplay: 'Benin',
    countryCode3: 'BEN',
    countryCode2: 'BJ'
  },
  {
    countryName: '不丹',
    mapDisplay: 'Bhutan',
    countryCode3: 'BTN',
    countryCode2: 'BT'
  },
  {
    countryName: '博茨瓦纳',
    mapDisplay: 'Botswana',
    countryCode3: 'BWA',
    countryCode2: 'BW'
  },
  {
    countryName: '巴西',
    mapDisplay: 'Brazil',
    countryCode3: 'BRA',
    countryCode2: 'BR'
  },
  {
    countryName: '保加利亚',
    mapDisplay: 'Bulgaria',
    countryCode3: 'BGR',
    countryCode2: 'BG'
  },
  {
    countryName: '柬埔寨',
    mapDisplay: 'Cambodia',
    countryCode3: 'KHM',
    countryCode2: 'KH'
  },
  {
    countryName: '喀麦隆',
    mapDisplay: 'Cameroon',
    countryCode3: 'CMR',
    countryCode2: 'CM'
  },
  {
    countryName: '加拿大',
    mapDisplay: 'Canada',
    countryCode3: 'CAN',
    countryCode2: 'CA'
  },
  {
    countryName: '智利',
    mapDisplay: 'Chile',
    countryCode3: 'CHL',
    countryCode2: 'CL'
  },
  {
    countryName: '哥伦比亚',
    mapDisplay: 'Colombia',
    countryCode3: 'COL',
    countryCode2: 'CO'
  },
  {
    countryName: '哥斯达黎加',
    mapDisplay: 'Costa Rica',
    countryCode3: 'CRI',
    countryCode2: 'CR'
  },
  {
    countryName: '克罗地亚',
    mapDisplay: 'Croatia',
    countryCode3: 'HRV',
    countryCode2: 'HR'
  },
  {
    countryName: '丹麦',
    mapDisplay: 'Denmark',
    countryCode3: 'DNK',
    countryCode2: 'DK'
  },
  {
    countryName: '多明尼加共和国',
    mapDisplay: 'Dominican Republic',
    countryCode3: 'DOM',
    countryCode2: 'DO'
  },
  {
    countryName: '厄瓜多尔',
    mapDisplay: 'Ecuador',
    countryCode3: 'ECU',
    countryCode2: 'EC'
  },
  {
    countryName: '埃及',
    mapDisplay: 'Egypt',
    countryCode3: 'EGY',
    countryCode2: 'EG'
  },
  {
    countryName: '厄立特里亚',
    mapDisplay: 'Eritrea',
    countryCode3: 'ERI',
    countryCode2: 'ER'
  },
  {
    countryName: '埃塞俄比亚',
    mapDisplay: 'Ethiopia',
    countryCode3: 'ETH',
    countryCode2: 'ET'
  },
  {
    countryName: '芬兰',
    mapDisplay: 'Finland',
    countryCode3: 'FIN',
    countryCode2: 'FI'
  },
  {
    countryName: '法国',
    mapDisplay: 'France',
    countryCode3: 'FRA',
    countryCode2: 'FR'
  },
  {
    countryName: '加蓬',
    mapDisplay: 'Gabon',
    countryCode3: 'GAB',
    countryCode2: 'GA'
  },
  {
    countryName: '乔治亚州',
    mapDisplay: 'Georgia',
    countryCode3: 'GEO',
    countryCode2: 'GE'
  },
  {
    countryName: '德国',
    mapDisplay: 'Germany',
    countryCode3: 'DEU',
    countryCode2: 'DE'
  },
  {
    countryName: '加纳',
    mapDisplay: 'Ghana',
    countryCode3: 'GHA',
    countryCode2: 'GH'
  },
  {
    countryName: '希腊',
    mapDisplay: 'Greece',
    countryCode3: 'GRC',
    countryCode2: 'GR'
  },
  {
    countryName: '格陵兰',
    mapDisplay: 'Greenland',
    countryCode3: 'GRL',
    countryCode2: 'GL'
  },
  {
    countryName: '危地马拉',
    mapDisplay: 'Guatemala',
    countryCode3: 'GTM',
    countryCode2: 'GT'
  },
  {
    countryName: '几内亚',
    mapDisplay: 'Guinea',
    countryCode3: 'GIN',
    countryCode2: 'GN'
  },
  {
    countryName: '洪都拉斯',
    mapDisplay: 'Honduras',
    countryCode3: 'HND',
    countryCode2: 'HN'
  },
  {
    countryName: '匈牙利',
    mapDisplay: 'Hungary',
    countryCode3: 'HUN',
    countryCode2: 'HU'
  },
  {
    countryName: '冰岛',
    mapDisplay: 'Iceland',
    countryCode3: 'ISL',
    countryCode2: 'IS'
  },
  {
    countryName: '印度',
    mapDisplay: 'India',
    countryCode3: 'IND',
    countryCode2: 'IN'
  },
  {
    countryName: '印度尼西亚',
    mapDisplay: 'Indonesia',
    countryCode3: 'IDN',
    countryCode2: 'ID'
  },
  {
    countryName: '爱尔兰',
    mapDisplay: 'Ireland',
    countryCode3: 'IRL',
    countryCode2: 'IE'
  },
  {
    countryName: '意大利',
    mapDisplay: 'Italy',
    countryCode3: 'ITA',
    countryCode2: 'IT'
  },
  {
    countryName: '日本',
    mapDisplay: 'Japan',
    countryCode3: 'JPN',
    countryCode2: 'JP'
  },
  {
    countryName: '约旦',
    mapDisplay: 'Jordan',
    countryCode3: 'JOR',
    countryCode2: 'JO'
  },
  {
    countryName: '哈萨克斯坦',
    mapDisplay: 'Kazakhstan',
    countryCode3: 'KAZ',
    countryCode2: 'KZ'
  },
  {
    countryName: '肯尼亚',
    mapDisplay: 'Kenya',
    countryCode3: 'KEN',
    countryCode2: 'KE'
  },
  {
    countryName: '科威特',
    mapDisplay: 'Kuwait',
    countryCode3: 'KWT',
    countryCode2: 'KW'
  },
  {
    countryName: '吉尔吉斯斯坦',
    mapDisplay: 'Kyrgyzstan',
    countryCode3: 'KGZ',
    countryCode2: 'KG'
  },
  {
    countryName: '马达加斯加',
    mapDisplay: 'Madagascar',
    countryCode3: 'MDG',
    countryCode2: 'MG'
  },
  {
    countryName: '马来西亚',
    mapDisplay: 'Malaysia',
    countryCode3: 'MYS',
    countryCode2: 'MY'
  },
  {
    countryName: '马里',
    mapDisplay: 'Mali',
    countryCode3: 'MLI',
    countryCode2: 'ML'
  },
  {
    countryName: '毛里塔尼亚',
    mapDisplay: 'Mauritania',
    countryCode3: 'MRT',
    countryCode2: 'MR'
  },
  {
    countryName: '墨西哥',
    mapDisplay: 'Mexico',
    countryCode3: 'MEX',
    countryCode2: 'MX'
  },
  {
    countryName: '蒙古',
    mapDisplay: 'Mongolia',
    countryCode3: 'MNG',
    countryCode2: 'MN'
  },
  {
    countryName: '黑山',
    mapDisplay: 'Montenegro',
    countryCode3: 'MNE',
    countryCode2: 'ME'
  },
  {
    countryName: '摩洛哥',
    mapDisplay: 'Morocco',
    countryCode3: 'MAR',
    countryCode2: 'MA'
  },
  {
    countryName: '莫桑比克',
    mapDisplay: 'Mozambique',
    countryCode3: 'MOZ',
    countryCode2: 'MZ'
  },
  {
    countryName: '纳米比亚',
    mapDisplay: 'Namibia',
    countryCode3: 'NAM',
    countryCode2: 'NA'
  },
  {
    countryName: '尼泊尔',
    mapDisplay: 'Nepal',
    countryCode3: 'NPL',
    countryCode2: 'NP'
  },
  {
    countryName: '荷兰',
    mapDisplay: 'Netherlands',
    countryCode3: 'NLD',
    countryCode2: 'NL'
  },
  {
    countryName: '新西兰',
    mapDisplay: 'New Zealand',
    countryCode3: 'NZL',
    countryCode2: 'NZ'
  },
  {
    countryName: '尼日尔',
    mapDisplay: 'Niger',
    countryCode3: 'NER',
    countryCode2: 'NE'
  },
  {
    countryName: '尼日利亚',
    mapDisplay: 'Nigeria',
    countryCode3: 'NGA',
    countryCode2: 'NG'
  },
  {
    countryName: '挪威',
    mapDisplay: 'Norway',
    countryCode3: 'NOR',
    countryCode2: 'NO'
  },
  {
    countryName: '阿曼',
    mapDisplay: 'Oman',
    countryCode3: 'OMN',
    countryCode2: 'OM'
  },
  {
    countryName: '巴拿马',
    mapDisplay: 'Panama',
    countryCode3: 'PAN',
    countryCode2: 'PA'
  },
  {
    countryName: '巴布亚新几内亚',
    mapDisplay: 'Papua New Guinea',
    countryCode3: 'PNG',
    countryCode2: 'PG'
  },
  {
    countryName: '巴拉圭',
    mapDisplay: 'Paraguay',
    countryCode3: 'PRY',
    countryCode2: 'PY'
  },
  {
    countryName: '秘鲁',
    mapDisplay: 'Peru',
    countryCode3: 'PER',
    countryCode2: 'PE'
  },
  {
    countryName: '菲律宾',
    mapDisplay: 'Philippines',
    countryCode3: 'PHL',
    countryCode2: 'PH'
  },
  {
    countryName: '波兰',
    mapDisplay: 'Poland',
    countryCode3: 'POL',
    countryCode2: 'PL'
  },
  {
    countryName: '葡萄牙',
    mapDisplay: 'Portugal',
    countryCode3: 'PRT',
    countryCode2: 'PT'
  },
  {
    countryName: '罗马尼亚',
    mapDisplay: 'Romania',
    countryCode3: 'ROU',
    countryCode2: 'RO'
  },
  {
    countryName: '沙特阿拉伯',
    mapDisplay: 'Saudi Arabia',
    countryCode3: 'SAU',
    countryCode2: 'SA'
  },
  {
    countryName: '塞内加尔',
    mapDisplay: 'Senegal',
    countryCode3: 'SEN',
    countryCode2: 'SN'
  },
  {
    countryName: '塞尔维亚',
    mapDisplay: 'Serbia',
    countryCode3: 'SRB',
    countryCode2: 'RS'
  },
  {
    countryName: '斯洛伐克',
    mapDisplay: 'Slovakia',
    countryCode3: 'SVK',
    countryCode2: 'SK'
  },
  {
    countryName: '南非',
    mapDisplay: 'South Africa',
    countryCode3: 'ZAF',
    countryCode2: 'ZA'
  },
  {
    countryName: '西班牙',
    mapDisplay: 'Spain',
    countryCode3: 'ESP',
    countryCode2: 'ES'
  },
  {
    countryName: '瑞典',
    mapDisplay: 'Sweden',
    countryCode3: 'SWE',
    countryCode2: 'SE'
  },
  {
    countryName: '瑞士',
    mapDisplay: 'Switzerland',
    countryCode3: 'CHE',
    countryCode2: 'CH'
  },
  {
    countryName: '塔吉克斯坦',
    mapDisplay: 'Tajikistan',
    countryCode3: 'TJK',
    countryCode2: 'TJ'
  },
  {
    countryName: '泰国',
    mapDisplay: 'Thailand',
    countryCode3: 'THA',
    countryCode2: 'TH'
  },
  {
    countryName: '多哥',
    mapDisplay: 'Togo',
    countryCode3: 'TGO',
    countryCode2: 'TG'
  },
  {
    countryName: '突尼斯',
    mapDisplay: 'Tunisia',
    countryCode3: 'TUN',
    countryCode2: 'TN'
  },
  {
    countryName: '土库曼斯坦',
    mapDisplay: 'Turkmenistan',
    countryCode3: 'TKM',
    countryCode2: 'TM'
  },
  {
    countryName: '乌干达',
    mapDisplay: 'Uganda',
    countryCode3: 'UGA',
    countryCode2: 'UG'
  },
  {
    countryName: '乌克兰',
    mapDisplay: 'Ukraine',
    countryCode3: 'UKR',
    countryCode2: 'UA'
  },
  {
    countryName: '阿拉伯联合酋长国',
    mapDisplay: 'United Arab Emirates',
    countryCode3: 'ARE',
    countryCode2: 'AE'
  },
  {
    countryName: '英国',
    mapDisplay: 'United Kingdom',
    countryCode3: 'GBR',
    countryCode2: 'GB'
  },
  {
    countryName: '美国',
    mapDisplay: 'United States',
    countryCode3: 'USA',
    countryCode2: 'US'
  },
  {
    countryName: '乌拉圭',
    mapDisplay: 'Uruguay',
    countryCode3: 'URY',
    countryCode2: 'UY'
  },
  {
    countryName: '乌兹别克斯坦',
    mapDisplay: 'Uzbekistan',
    countryCode3: 'UZB',
    countryCode2: 'UZ'
  },
  {
    countryName: '越南',
    mapDisplay: 'Vietnam',
    countryCode3: 'VNM',
    countryCode2: 'VN'
  },
  {
    countryName: '撒哈拉沙漠西部',
    mapDisplay: 'Western Sahara',
    countryCode3: 'ESH',
    countryCode2: 'EH'
  },
  {
    countryName: '赞比亚',
    mapDisplay: 'Zambia',
    countryCode3: 'ZMB',
    countryCode2: 'ZM'
  }
]
